/*
  # Enhanced Patient Schema

  1. New Tables
    - `patient_conditions` - Store medical conditions separately
    - `social_conditions` - Track social determinants of health
    
  2. Updates
    - Add new fields to patients table
    - Add proper indexing
    
  3. Security
    - Enable RLS
    - Add policies for access control
*/

-- Add new fields to patients table
ALTER TABLE patients ADD COLUMN IF NOT EXISTS gender text;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS emergency_contact text;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS insurance_info jsonb;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS preferred_language text;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS notes text;

-- Create patient conditions table
CREATE TABLE IF NOT EXISTS patient_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  condition text NOT NULL,
  status text NOT NULL,
  diagnosed_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social conditions table
CREATE TABLE IF NOT EXISTS social_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  category text NOT NULL,
  status text NOT NULL CHECK (status IN ('stable', 'at-risk', 'critical')),
  details text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE patient_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_conditions ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_patient_conditions_patient ON patient_conditions(patient_id);
CREATE INDEX IF NOT EXISTS idx_social_conditions_patient ON social_conditions(patient_id);

-- Add RLS policies
CREATE POLICY "Care team can view patient conditions"
  ON patient_conditions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = patient_conditions.patient_id
    AND user_id = auth.uid()::uuid
  ));

CREATE POLICY "Care team can view social conditions"
  ON social_conditions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = social_conditions.patient_id
    AND user_id = auth.uid()::uuid
  ));