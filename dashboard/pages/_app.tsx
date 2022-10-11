import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Aksel Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
