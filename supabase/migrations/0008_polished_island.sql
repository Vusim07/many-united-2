-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON patients(created_at);
CREATE INDEX IF NOT EXISTS idx_patients_updated_at ON patients(updated_at);

-- Add policies for patient data access
CREATE POLICY "Doctors can manage their patients' conditions"
  ON patient_conditions
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = patient_conditions.patient_id
    AND user_id = auth.uid()::uuid
    AND role = 'doctor'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = patient_conditions.patient_id
    AND user_id = auth.uid()::uuid
    AND role = 'doctor'
  ));

CREATE POLICY "CHWs can view patient conditions"
  ON patient_conditions
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = patient_conditions.patient_id
    AND user_id = auth.uid()::uuid
    AND role = 'chw'
  ));

-- Add policies for social conditions
CREATE POLICY "Care team can manage social conditions"
  ON social_conditions
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = social_conditions.patient_id
    AND user_id = auth.uid()::uuid
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM care_team_members
    WHERE patient_id = social_conditions.patient_id
    AND user_id = auth.uid()::uuid
  ));

-- Add function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updating timestamps
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_conditions_updated_at
    BEFORE UPDATE ON patient_conditions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_conditions_updated_at
    BEFORE UPDATE ON social_conditions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();