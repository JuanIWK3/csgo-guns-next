import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CSGO Guns</title>
        <meta name="description" content="Guns data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
