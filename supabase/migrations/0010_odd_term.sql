-- Drop existing policies on patients table
DROP POLICY IF EXISTS "Doctors can view their patients" ON patients;

-- Create new policy that allows authenticated users to view patients
CREATE POLICY "Allow authenticated users to view patients"
  ON patients
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Add debugging function
CREATE OR REPLACE FUNCTION debug_auth()
RETURNS TABLE (
  role text,
  uid uuid,
  email text,
  authenticated boolean
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT
    auth.role() as role,
    auth.uid()::uuid as uid,
    current_setting('request.jwt.claims', true)::json->>'email' as email,
    (auth.role() = 'authenticated') as authenticated;
$$;