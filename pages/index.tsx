import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Gun } from "../types";

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
            <p>
              <strong>{gun.name}</strong>
            </p>
            <li>Type: {gun.type}</li>
            <li>Price: {gun.price}</li>
            <li>Ammo: {gun.ammo}</li>
            <li>Kill Award: {gun.killAward}</li>
            <li>Damage: {gun.damage}</li>
            <li>Firerate: {gun.firerate}</li>
            <li>Recoil Control: {gun.recoilControl}</li>
            <li>Accurate Range: {gun.accurateRange}</li>
            <li>Armor Penetration: {gun.armorPenetration}</li>
            <li>Side: {gun.side}</li>
          </ul>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://csgogunsapi.herokuapp.com/");
  const data: Gun[] = await res.json();

  return { props: { guns: data } };
};

export default Home;
