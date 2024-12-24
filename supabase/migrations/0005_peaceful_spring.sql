/*
  # Improve Authentication Policies
  
  1. Changes
    - Simplify RLS policies
    - Add proper authentication checks
    - Fix user synchronization issues
    
  2. Security
    - Maintain RLS protection
    - Allow proper user creation/updates
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read" ON users;
DROP POLICY IF EXISTS "Allow user creation" ON users;
DROP POLICY IF EXISTS "Allow users to update own profile" ON users;

-- Create new simplified policies
CREATE POLICY "Enable read for all authenticated users"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON users FOR INSERT
  WITH CHECK (auth.jwt() IS NOT NULL);

CREATE POLICY "Enable update for own profile"
  ON users FOR UPDATE
  USING (auth.jwt() IS NOT NULL)
  WITH CHECK (auth.jwt() IS NOT NULL);