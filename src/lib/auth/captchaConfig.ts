import type { SignUpConfig } from '@clerk/types';

export const captchaConfig: SignUpConfig = {
  signUp: {
    // Use invisible CAPTCHA by default
    strategy: 'invisible_recaptcha',
    // Fallback to smart CAPTCHA if needed
    fallback: 'smart_captcha'
  }
};