export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AuthError';
  }
}