-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for care team members" ON patients;
DROP POLICY IF EXISTS "Enable patient creation for doctors" ON patients;
DROP POLICY IF EXISTS "Enable patient updates for care team doctors" ON patients;

-- Create simplified policies for testing
CREATE POLICY "Enable all operations for authenticated users"
  ON patients
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Add debug function
CREATE OR REPLACE FUNCTION debug_auth_status()
RETURNS TABLE (
  current_role text,
  is_authenticated boolean,
  current_uid uuid,
  jwt_claims jsonb
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY SELECT
    auth.role()::text,
    auth.role() = 'authenticated',
    auth.uid()::uuid,
    current_setting('request.jwt.claims', true)::jsonb;
END;
$$;