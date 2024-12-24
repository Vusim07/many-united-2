import { UserRole } from '@/types/auth';

export const VALID_ROLES = ['doctor', 'chw'] as const;

export function isValidRole(role: unknown): role is UserRole {
  return typeof role === 'string' && VALID_ROLES.includes(role as UserRole);
}

export function validateRole(role: unknown): UserRole {
  if (!isValidRole(role)) {
    throw new Error(`Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`);
  }
  return role;
}