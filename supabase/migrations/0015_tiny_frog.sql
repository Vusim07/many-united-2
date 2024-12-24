-- Drop existing policies
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON patients;

-- Create more permissive policy for testing
CREATE POLICY "Enable insert for authenticated users"
  ON patients
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
  ON patients
  FOR SELECT
  USING (true);

-- Add function to check auth status
CREATE OR REPLACE FUNCTION get_auth_status()
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN jsonb_build_object(
    'authenticated', auth.role() = 'authenticated',
    'role', auth.role(),
    'user_id', auth.uid()::text,
    'jwt', current_setting('request.jwt.claims', true)::jsonb
  );
END;
$$;