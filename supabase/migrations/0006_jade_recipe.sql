-- Drop existing policies
DROP POLICY IF EXISTS "Enable read for all authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update for own profile" ON users;

-- Create new policies that allow operations without auth checks initially
CREATE POLICY "Allow all operations during signup"
  ON users
  USING (true)
  WITH CHECK (true);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);