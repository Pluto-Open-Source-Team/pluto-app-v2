'use client';

import React from 'react';

import Page from '@/components/Page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="theme-color"
          content="#ffffff"
        />
        <title>Pluto Policy Manager</title>
        <meta
          name="description"
          content="Pluto Policy Manager is a set of tools to help you manage your organization Chromebooks policies."
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          property="og:locale"
          content="en_US"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:title"
          content="Pluto Policy Manager"
        />
        <meta
          property="og:description"
          content="Pluto Policy Manager is a set of tools to help you manage your organization Chromebooks policies."
        />
        <meta
          property="og:url"
          content="https://pluto.chromebook.cloud/"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
