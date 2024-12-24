-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON patients;

-- Create comprehensive RLS policies for patients table
CREATE POLICY "Enable read access for care team members"
  ON patients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM care_team_members
      WHERE patient_id = patients.id
      AND user_id = auth.uid()::uuid
    )
    OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::uuid
      AND role = 'doctor'
    )
  );

-- Allow doctors to create patients
CREATE POLICY "Enable patient creation for doctors"
  ON patients FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::uuid
      AND role = 'doctor'
    )
  );

-- Allow doctors to update their patients
CREATE POLICY "Enable patient updates for care team doctors"
  ON patients FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM care_team_members
      WHERE patient_id = patients.id
      AND user_id = auth.uid()::uuid
      AND role = 'doctor'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM care_team_members
      WHERE patient_id = patients.id
      AND user_id = auth.uid()::uuid
      AND role = 'doctor'
    )
  );

-- Add helper function to check if user is a doctor
CREATE OR REPLACE FUNCTION is_doctor()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()::uuid
    AND role = 'doctor'
  );
$$;

-- Add function to automatically create care team entry after patient creation
CREATE OR REPLACE FUNCTION handle_new_patient()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO care_team_members (patient_id, user_id, role, primary_provider)
  VALUES (NEW.id, auth.uid()::uuid, 'Primary Care Physician', true);
  RETURN NEW;
END;
$$;

-- Create trigger for automatic care team assignment
DROP TRIGGER IF EXISTS on_patient_created ON patients;
CREATE TRIGGER on_patient_created
  AFTER INSERT ON patients
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_patient();