import { User } from '@clerk/clerk-react';
import { UserRole } from '@/types/auth';
import { validateRole } from './roleValidation';

export function getUserRole(user: User): UserRole {
  const role = user.publicMetadata.role;
  return validateRole(role);
}

export async function setUserRole(user: User, role: UserRole): Promise<void> {
  await user.update({
    publicMetadata: { ...user.publicMetadata, role },
    privateMetadata: { ...user.privateMetadata, role }
  });
}