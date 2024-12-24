import { AuthError } from './AuthError';

export class CaptchaError extends AuthError {
  constructor(message: string = 'Security verification failed. Please try again.') {
    super(message, 'CAPTCHA_FAILED');
    this.name = 'CaptchaError';
  }
}