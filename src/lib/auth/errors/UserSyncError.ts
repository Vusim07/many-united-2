import { AuthError } from './AuthError';

export class UserSyncError extends AuthError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'USER_SYNC_ERROR', originalError);
    this.name = 'UserSyncError';
  }
}