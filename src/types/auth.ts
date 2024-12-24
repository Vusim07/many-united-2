export type UserRole = 'doctor' | 'chw' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  area?: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}