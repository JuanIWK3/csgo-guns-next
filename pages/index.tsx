import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import { Gun } from "../types";

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
  const [filteredGuns, setFilteredGuns] = useState<Gun[]>(guns);
  const allGuns = guns;

  const handleSearch = (e: HTMLInputElement) => {
    const search = e.value;
    const filterGuns = (movies: Gun[], search: string) => {
      return movies.filter(
        (gun) => gun.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    };
    setFilteredGuns(filterGuns(allGuns, search));
  };

  const style = {
    li: {},
    ul: {
      border: "1px solid #444",
      borderRadius: ".5rem",
      margin: "16px",
    },
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>CSGO Guns</title>
        <meta name="description" content="Guns data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          style={{
            backgroundColor: "#333",
            border: "1px solid #222",
            width: "100%",
            height: "36px",
            marginTop: "24px",
            color: "#fff",
            textAlign: "center",
            fontSize: "18px",
          }}
          type="text"
          onChange={(e: SyntheticEvent) => {
            handleSearch(e.currentTarget as HTMLInputElement);
          }}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {filteredGuns.map((gun) => {
          return (
            <ul style={style.ul} key={gun.id}>
              <p style={{ fontSize: "1.4rem" }}>
                <strong>{gun.name}</strong>
              </p>
              {/* <p>Type: {gun.type}</p>
             <p>Price: {gun.price}</p> 
             <p>Ammo: {gun.ammo}</p>
            <p>Kill Award: {gun.killAward}</p>
            <p>Damage: {gun.damage}</p>
            <p>Firerate: {gun.firerate}</p>
            <p>Recoil Control: {gun.recoilControl}</p>
            <p>Accurate Range: {gun.accurateRange}</p>
            <p>Armor Penetration: {gun.armorPenetration}</p>
            <p>Side: {gun.side}</p> */}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://csgogunsapi.herokuapp.com/");
  const data: Gun[] = await res.json();

  return { props: { guns: data } };
};

export default Home;
