/*
  # Seed Patient Data

  1. Initial Data
    - Sample patients with diverse medical conditions
    - Patient conditions and social determinants
    - Care team assignments
  
  2. Security
    - All inserts respect RLS policies
    - Data follows established schema constraints
*/

-- Seed initial patients
INSERT INTO patients (name, date_of_birth, address, phone, medical_history, gender, emergency_contact, insurance_info, preferred_language)
VALUES
  (
    'Sipho Dlamini',
    '1980-05-15',
    '123 Umlazi Rd, Durban, South Africa',
    '+27 83 123 4567',
    'Hypertension, Type 2 Diabetes',
    'Male',
    'Thembi Dlamini (Wife) +27 83 123 4568',
    '{"provider": "Discovery Health", "plan": "Essential", "number": "DH123456"}',
    'Zulu'
  ),
  (
    'Nomsa Khumalo',
    '1975-08-22',
    '456 Park Rd, Sandton, South Africa',
    '+27 82 987 6543',
    'Asthma, Arthritis',
    'Female',
    'John Khumalo (Son) +27 82 987 6544',
    '{"provider": "Momentum Health", "plan": "Standard", "number": "MH789012"}',
    'English'
  ),
  (
    'Lindiwe Mthembu',
    '1990-03-12',
    '78 Soweto Ave, Johannesburg, South Africa',
    '+27 81 345 6789',
    'Migraine, Seasonal Allergies',
    'Female',
    'Sbu Mthembu (Spouse) +27 81 345 6780',
    '{"provider": "Bonitas", "plan": "Primary", "number": "BP345678"}',
    'Xhosa'
  );

-- Add patient conditions
INSERT INTO patient_conditions (patient_id, condition, status, diagnosed_date, notes)
SELECT 
  id as patient_id,
  'Hypertension' as condition,
  'Active' as status,
  '2020-01-15' as diagnosed_date,
  'Well controlled with medication' as notes
FROM patients 
WHERE name = 'Sipho Dlamini';

INSERT INTO patient_conditions (patient_id, condition, status, diagnosed_date, notes)
SELECT 
  id as patient_id,
  'Type 2 Diabetes' as condition,
  'Active' as status,
  '2019-06-20' as diagnosed_date,
  'Regular monitoring required' as notes
FROM patients 
WHERE name = 'Sipho Dlamini';

-- Add social conditions
INSERT INTO social_conditions (patient_id, category, status, details)
SELECT 
  id as patient_id,
  'Housing' as category,
  'stable' as status,
  'Stable housing with family' as details
FROM patients 
WHERE name = 'Sipho Dlamini';

INSERT INTO social_conditions (patient_id, category, status, details)
SELECT 
  id as patient_id,
  'Transportation' as category,
  'at-risk' as status,
  'Relies on public transit' as details
FROM patients 
WHERE name = 'Sipho Dlamini';

-- Add care team assignments
INSERT INTO care_team_members (patient_id, user_id, role, primary_provider)
SELECT 
  patients.id as patient_id,
  users.id as user_id,
  'Primary Care Physician' as role,
  true as primary_provider
FROM patients 
CROSS JOIN users 
WHERE patients.name = 'Sipho Dlamini' 
AND users.role = 'doctor' 
LIMIT 1;