-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to view patients" ON patients;

-- Create new simplified policy for testing
CREATE POLICY "Enable read access for all authenticated users"
  ON patients FOR SELECT
  USING (auth.role() = 'authenticated');

-- Add more debug functions
CREATE OR REPLACE FUNCTION debug_patient_access(patient_id uuid)
RETURNS TABLE (
  has_access boolean,
  reason text
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT
    CASE 
      WHEN auth.role() = 'authenticated' THEN true
      ELSE false
    END as has_access,
    CASE 
      WHEN auth.role() = 'authenticated' THEN 'User is authenticated'
      ELSE 'User is not authenticated'
    END as reason;
END;
$$;