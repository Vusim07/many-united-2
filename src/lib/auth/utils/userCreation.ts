import { SignUp } from '@clerk/clerk-react';

export async function updateUserMetadata(signUp: SignUp, role: string) {
  try {
    const metadata = {
      role,
      createdAt: new Date().toISOString(),
    };

    await signUp.update({
      publicMetadata: metadata,
      privateMetadata: metadata,
    });

    return true;
  } catch (error) {
    console.error('Failed to update user metadata:', error);
    return false;
  }
}