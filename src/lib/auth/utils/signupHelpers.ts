import { SignUp } from '@clerk/clerk-react';
import { UserRole } from '@/types/auth';
import { AuthError } from '../errors';

export async function createInitialUser(signUp: SignUp, data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  try {
    // Create user with minimal data first
    const result = await signUp.create({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.email,
      password: data.password,
    });

    if (!result) {
      throw new AuthError('Failed to create user account');
    }

    // Update metadata after successful creation
    if (result.status === 'complete' && result.createdUserId) {
      await signUp.update({
        publicMetadata: {
          role: data.role,
          createdAt: new Date().toISOString(),
        },
        privateMetadata: {
          role: data.role,
          createdAt: new Date().toISOString(),
        },
      });
    }

    return result;
  } catch (error: any) {
    console.error('User creation error:', error);
    throw error;
  }
}