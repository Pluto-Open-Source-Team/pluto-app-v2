import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pluto Policy Manager',
  description:
    'Pluto Policy Manager is a set of tools to help you manage your organization Chromebooks policies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
