import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import styles from '../styles/Home.module.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { Button, Dropdown, Form, FormControl, Table } from 'react-bootstrap';

import { Gun } from '../types';
import Link from 'next/link';

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
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
