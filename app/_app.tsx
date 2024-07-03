// app/_app.tsx
import React from 'react';
import { UserProvider } from '../context/UserContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
