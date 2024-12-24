import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { useColorScheme } from '@/hooks/useColorScheme';
import { clerkConfig } from '@/lib/auth/config';
import { useSessionSync } from '@/lib/auth/hooks/useSessionSync';

function SessionSync({ children }: { children: React.ReactNode }) {
  useSessionSync();
  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useColorScheme();

  return (
    <ClerkProvider
      {...clerkConfig}
      appearance={{
        ...clerkConfig.appearance,
        baseTheme: isDark ? dark : undefined,
      }}
    >
      <SessionSync>{children}</SessionSync>
    </ClerkProvider>
  );
}