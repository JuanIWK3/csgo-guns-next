import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetGunResults, Gun } from "../types";

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CSGO Guns</title>
        <meta name="description" content="Guns data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {guns.map((gun) => {
        return (
          <ul key={gun.id}>
            <li>{gun.name}</li>
            <li>{gun.type}</li>
            <li>{gun.price}</li>
            <li>{gun.ammo}</li>
            <li>{gun.killAward}</li>
            <li>{gun.damage}</li>
            <li>{gun.firerate}</li>
            <li>{gun.recoilControl}</li>
            <li>{gun.accurateRange}</li>
            <li>{gun.armorPenetration}</li>
            <li>{gun.side}</li>
          </ul>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://csgogunsapi.herokuapp.com/");
  const data: GetGunResults = await res.json();

  return { props: { guns: data } };
};

export default Home;
