import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent, useRef, useState } from "react";

import styles from "../styles/Home.module.css";
import "bootswatch/dist/darkly/bootstrap.min.css";
import { Button, Dropdown, Form, FormControl, Table } from "react-bootstrap";

import { Gun } from "../types";

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
  const [filteredGuns, setFilteredGuns] = useState<Gun[]>(guns);
  const [typeDrop, setTypeDrop] = useState("Types");
  const allGuns = guns;
  let gunTypes: string[] = [];

  for (let i = 0; i < allGuns.length; i++) {
    gunTypes[i] = allGuns[i].type;
  }

  gunTypes = removeDuplicates(gunTypes);

  function removeDuplicates(arr: string[]) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  const filterByType = (e: any) => {
    const { id } = e.currentTarget;
    console.log(id);

    const temp = guns.filter((gun) =>
      gun.type.toUpperCase().includes(id.toUpperCase())
    );

    if (id !== "") setTypeDrop(id);
    setFilteredGuns(temp);
  };

  const handleSearch = (e: HTMLInputElement) => {
    const search = e.value;

    const filterByName = (guns: Gun[], search: string) => {
      return guns.filter((gun) =>
        gun.name.toUpperCase().includes(search.toUpperCase())
      );
    };

    setFilteredGuns(filterByName(allGuns, search));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CSGO Guns</title>
        <meta name="description" content="Guns data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="filters">
        <FormControl
          style={{
            backgroundColor: "#222",
            border: "1px solid #333",
            color: "#fff",
          }}
          className="text-input"
          placeholder="Search Guns"
          type="text"
          onChange={(e: SyntheticEvent) => {
            handleSearch(e.currentTarget as HTMLInputElement);
          }}
        />
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {typeDrop}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              id=""
              onClick={(e) => {
                setTypeDrop("All Types"), filterByType(e);
              }}
            >
              All Types
            </Dropdown.Item>
            {gunTypes.map((type) => {
              return (
                <>
                  <Dropdown.Item
                    id={type}
                    onClick={(e) => {
                      filterByType(e);
                    }}
                    key={type}
                  >
                    {type}
                  </Dropdown.Item>
                </>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Table striped className="mt-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Kill Award</th>
            <th>Ammo</th>
            <th>Damage</th>
            <th>Firerate</th>
            <th>Recoil Control</th>
            <th>Accurate Range</th>
            <th>Armor Penetration</th>
            <th>Side</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuns.map((gun) => {
            return (
              <>
                <tr key={gun.id}>
                  <td>{gun.name}</td>
                  <td>{gun.type}</td>
                  <td>{gun.price}</td>
                  <td>{gun.killAward}</td>
                  <td>{gun.ammo}</td>
                  <td>{gun.damage}</td>
                  <td>{gun.firerate}</td>
                  <td>{gun.recoilControl}</td>
                  <td>{gun.accurateRange}</td>
                  <td>{gun.armorPenetration}</td>
                  <td>{gun.side}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://csgogunsapi.herokuapp.com/");
  const data: Gun[] = await res.json();

  return { props: { guns: data } };
};

export default Home;
