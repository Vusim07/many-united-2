/*
  # Fix RLS Policies for User Management
  
  1. Changes
    - Drop existing restrictive policies
    - Add new policies for user management
    - Fix authentication checks
    
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Allow initial user creation
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert for all users" ON users;
DROP POLICY IF EXISTS "Enable update for users based on clerk_id" ON users;

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Allow authenticated users to read"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow user creation"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to update own profile"
  ON users FOR UPDATE
  USING (clerk_id::text = auth.uid()::text)
  WITH CHECK (clerk_id::text = auth.uid()::text);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);