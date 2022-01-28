import '../styles/globals.scss';
import '../styles/loadout.scss';
import '../styles/about.scss';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
