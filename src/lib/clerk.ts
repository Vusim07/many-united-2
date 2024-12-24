import { ClerkProvider } from '@clerk/clerk-react';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
 throw new Error('Missing Clerk Publishable Key');
}

const clerkConfig = {
 publishableKey,
 appearance: {
   variables: {
     colorPrimary: '#2563eb',
   },
   elements: {
     formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white',
     card: 'bg-white shadow-md rounded-lg',
     formFieldInput: 'w-full px-3 py-2 border border-gray-300 rounded-md',
     captchaContainer: 'mt-4 mb-2'
   },
 }
};

export { ClerkProvider, clerkConfig };