-- Drop existing debug functions
DROP FUNCTION IF EXISTS debug_auth_status();
DROP FUNCTION IF EXISTS debug_auth();

-- Create simplified debug function
CREATE OR REPLACE FUNCTION debug_auth()
RETURNS TABLE (
  role text,
  is_authenticated boolean,
  user_id uuid,
  email text
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY SELECT
    COALESCE(auth.role()::text, 'none'),
    auth.role() = 'authenticated',
    auth.uid()::uuid,
    COALESCE(current_setting('request.jwt.claims', true)::jsonb->>'email', 'none');
END;
$$;

-- Drop existing patient policies
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON patients;

-- Create simplified policy for testing
CREATE POLICY "Enable all operations for authenticated users"
  ON patients
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');