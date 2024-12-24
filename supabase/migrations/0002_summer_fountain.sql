/*
  # Fix User Authentication Policies

  1. Changes
    - Update RLS policies to handle Clerk authentication
    - Add proper type casting for clerk_id comparisons
    - Enable secure user management while maintaining data isolation

  2. Security
    - Ensures proper authentication checks
    - Maintains data isolation between users
    - Allows necessary operations for user management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;

-- Create new policies with proper type casting
CREATE POLICY "Users can manage their own profile"
  ON users
  USING (clerk_id::text = auth.uid()::text)
  WITH CHECK (clerk_id::text = auth.uid()::text);

CREATE POLICY "Allow initial user creation"
  ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (clerk_id::text = auth.uid()::text)
  WITH CHECK (clerk_id::text = auth.uid()::text);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);