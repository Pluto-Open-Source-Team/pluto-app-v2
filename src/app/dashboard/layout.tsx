'use client';

import React from 'react';

import { AuthProvider, AuthConsumer } from '@/contexts/auth-context';
import { SplashScreen } from '@/components/SplashScreen';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AuthConsumer>
        {(auth) => {
          const showSplashScreen = !auth.isInitialized;

          return showSplashScreen ? (
            <SplashScreen />
          ) : (
            <section>{children}</section>
          );
        }}
      </AuthConsumer>
    </AuthProvider>
  );
}
