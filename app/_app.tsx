import React from 'react';
import { UserProvider } from '../context/UserContext';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
