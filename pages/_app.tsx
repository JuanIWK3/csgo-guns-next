import '../styles/globals.scss';
import '../styles/loadout.scss';
import '../styles/about.scss';

import styles from '../styles/Home.module.css';

import 'bootswatch/dist/vapor/bootstrap.min.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
