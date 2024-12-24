import { appearanceConfig } from './appearance';
import { routingConfig } from './routing';
import { captchaConfig } from './captcha';
import type { ClerkOptions } from '@clerk/types';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error('Missing Clerk Publishable Key - Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file');
  // Provide a more graceful fallback instead of throwing
  window.location.href = '/error?message=auth_configuration_error';
}

export const clerkConfig: ClerkOptions = {
  publishableKey: publishableKey || '',
  appearance: {
    ...appearanceConfig,
    elements: {
      ...appearanceConfig.elements,
      formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
      captchaContainer: 'mt-4'
    }
  },
  signUpUrl: routingConfig.signUpUrl,
  signInUrl: routingConfig.signInUrl,
  afterSignInUrl: routingConfig.afterSignInUrl,
  afterSignUpUrl: routingConfig.afterSignUpUrl,
  ...captchaConfig
};