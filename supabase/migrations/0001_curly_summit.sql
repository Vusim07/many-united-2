/*
  # Initial Schema Setup

  1. New Tables
    - users
      - Stores user profile information
      - Links to Clerk auth
    - patients
      - Stores patient information
    - visits
      - Stores visit requests and their status
    - visit_updates
      - Stores updates and notes for visits
    - vital_signs
      - Stores patient vital signs recorded during visits
    - care_team_members
      - Links patients with their care team (doctors, CHWs)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('doctor', 'chw', 'admin')),
  specialty text,
  license_number text,
  phone text,
  area text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date_of_birth date NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  medical_history text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create visits table
CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  chw_id uuid REFERENCES users(id),
  doctor_id uuid REFERENCES users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'completed', 'declined')),
  reason text NOT NULL,
  scheduled_date timestamptz,
  location_lat numeric,
  location_lng numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create visit_updates table
CREATE TABLE IF NOT EXISTS visit_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid REFERENCES visits(id) ON DELETE CASCADE NOT NULL,
  chw_id uuid REFERENCES users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('note', 'vital', 'medication', 'status')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create vital_signs table
CREATE TABLE IF NOT EXISTS vital_signs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid REFERENCES visits(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('blood_pressure', 'heart_rate', 'temperature', 'blood_sugar', 'oxygen')),
  value text NOT NULL,
  unit text NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

-- Create care_team_members table
CREATE TABLE IF NOT EXISTS care_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL,
  primary_provider boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(patient_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.jwt()->>'sub' = clerk_id);

CREATE POLICY "Doctors can view their patients"
  ON patients FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = patients.id
    AND user_id = (SELECT id FROM users WHERE clerk_id = auth.jwt()->>'sub')
  ));

CREATE POLICY "CHWs can view assigned visits"
  ON visits FOR SELECT
  USING (
    chw_id = (SELECT id FROM users WHERE clerk_id = auth.jwt()->>'sub')
    OR
    status = 'pending'
  );

CREATE POLICY "CHWs can update their visits"
  ON visits FOR UPDATE
  USING (chw_id = (SELECT id FROM users WHERE clerk_id = auth.jwt()->>'sub'));

CREATE POLICY "CHWs can add visit updates"
  ON visit_updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM visits
      WHERE visits.id = visit_updates.visit_id
      AND visits.chw_id = (SELECT id FROM users WHERE clerk_id = auth.jwt()->>'sub')
    )
  );

CREATE POLICY "Care team can view visit updates"
  ON visit_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM visits
      WHERE visits.id = visit_updates.visit_id
      AND (
        visits.chw_id = (SELECT id FROM users WHERE clerk_id = auth.jwt()->>'sub')
        OR
        visits.doctor_id = (SELECT id FROM users WHERE clerk_id = auth.jwt()->>'sub')
      )
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_visits_patient_id ON visits(patient_id);
CREATE INDEX idx_visits_chw_id ON visits(chw_id);
CREATE INDEX idx_visits_doctor_id ON visits(doctor_id);
CREATE INDEX idx_visit_updates_visit_id ON visit_updates(visit_id);
CREATE INDEX idx_care_team_patient_id ON care_team_members(patient_id);
CREATE INDEX idx_care_team_user_id ON care_team_members(user_id);