import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

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
    <html
      lang="en"
      className={inter.className}
    >
      <body>{children}</body>
    </html>
  );
}
