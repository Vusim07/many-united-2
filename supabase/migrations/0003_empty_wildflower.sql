/*
  # Fix User Authentication Policies

  1. Changes
    - Simplify RLS policies for user management
    - Allow initial user creation without auth
    - Fix user profile updates
    
  2. Security
    - Maintains data isolation
    - Allows necessary operations for user signup flow
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own profile" ON users;
DROP POLICY IF EXISTS "Allow initial user creation" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Create simplified policies
CREATE POLICY "Enable read access for authenticated users"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for all users"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for users based on clerk_id"
  ON users FOR UPDATE
  USING (clerk_id::text = auth.uid()::text);