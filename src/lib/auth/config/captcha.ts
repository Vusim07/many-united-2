import type { SignUpConfig } from '@clerk/types';

export const captchaConfig: SignUpConfig = {
  signUp: {
    // Only use invisible CAPTCHA
    strategy: "invisible_recaptcha",
    // Explicitly disable fallback
    fallback: "disabled",
    attributes: {
      role: { 
        type: 'string', 
        required: true,
        options: ['doctor', 'chw']
      }
    }
  }
};