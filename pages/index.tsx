import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent, useRef, useState } from "react";

import sectionSvg from "../images/section.svg";

import styles from "../styles/Home.module.css";

import "bootswatch/dist/darkly/bootstrap.min.css";
import { Button, Dropdown, Form, FormControl, Table } from "react-bootstrap";

import { Gun } from "../types";

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
  const [string, setString] = useState(
    "https://static.wikia.nocookie.net/cswikia/images/3/37/CSGO_XM1014_Inventory.png/revision/latest?cb=20130813200959"
  );
  const [selectedGun, setSelectedGun] = useState({
    id: "c26ac014-f606-4da1-9aa4-3e4ce1d584e3",
    name: "XM1014",
    ammo: "7/32",
    killAward: "900(300%)",
    damage: 120,
    firerate: 2,
    recoilControl: 1,
    accurateRange: "3m",
    armorPenetration: 160,
    type: "HEAVY",
    side: "TERRORISTS & COUNTER-TERRORISTS",
    price: 2000,
    picture:
      "https://static.wikia.nocookie.net/cswikia/images/3/37/CSGO_XM1014_Inventory.png",
    created_at: "2022-01-18T19:20:57.104Z",
    updated_at: "2022-01-20T18:22:35.707Z",
  });
  const sixGuns = [
    {
      id: "f53e8954-0457-487b-aaeb-59788299118d",
      name: "SAWED-OFF",
      ammo: "7/32",
      killAward: "900(300%)",
      damage: 256,
      firerate: 1,
      recoilControl: 1,
      accurateRange: "2m",
      armorPenetration: 150,
      type: "HEAVY",
      side: "TERRORISTS",
      price: 1100,
      picture:
        "https://static.wikia.nocookie.net/cswikia/images/b/b4/CSGO_Sawed-Off_Inventory.png/revision/latest?cb=20130813200706",
      created_at: "2022-01-18T19:22:42.965Z",
      updated_at: "2022-01-20T18:21:01.867Z",
    },
    {
      id: "c26ac014-f606-4da1-9aa4-3e4ce1d584e3",
      name: "XM1014",
      ammo: "7/32",
      killAward: "900(300%)",
      damage: 120,
      firerate: 2,
      recoilControl: 1,
      accurateRange: "3m",
      armorPenetration: 160,
      type: "HEAVY",
      side: "TERRORISTS & COUNTER-TERRORISTS",
      price: 2000,
      picture:
        "https://static.wikia.nocookie.net/cswikia/images/3/37/CSGO_XM1014_Inventory.png/revision/latest?cb=20130813200959",
      created_at: "2022-01-18T19:20:57.104Z",
      updated_at: "2022-01-20T18:22:35.707Z",
    },
    {
      id: "708c201c-7c83-47b2-9186-8579ae728211",
      name: "MAG-7",
      ammo: "5/32",
      killAward: "900(300%)",
      damage: 240,
      firerate: 1,
      recoilControl: 1,
      accurateRange: "3m",
      armorPenetration: 150,
      type: "HEAVY",
      side: "COUNTER-TERRORISTS",
      price: 1300,
      picture:
        "https://static.wikia.nocookie.net/cswikia/images/d/d4/CSGO_MAG-7_Inventory.png/revision/latest?cb=20130813200441",
      created_at: "2022-01-18T19:44:14.198Z",
      updated_at: "2022-01-20T18:32:31.258Z",
    },
    {
      id: "70762141-3899-4bc4-b18d-ecb635c2ea78",
      name: "M249",
      ammo: "100/200",
      killAward: "300(100%)",
      damage: 32,
      firerate: 12,
      recoilControl: 72,
      accurateRange: "17m",
      armorPenetration: 160,
      type: "HEAVY",
      side: "TERRORISTS & COUNTER-TERRORISTS",
      price: 5200,
      picture:
        "https://static.wikia.nocookie.net/cswikia/images/7/7c/CSGO_M249_Inventory.png/revision/latest?cb=20130813203106",
      created_at: "2022-01-18T19:23:35.463Z",
      updated_at: "2022-01-20T18:33:24.949Z",
    },
    {
      id: "58c1fa72-d2d8-429b-ad67-ba715f49755e",
      name: "NEGEV",
      ammo: "150/300",
      killAward: "300(100%)",
      damage: 35,
      firerate: 13,
      recoilControl: 79,
      accurateRange: "13m",
      armorPenetration: 142,
      type: "HEAVY",
      side: "TERRORISTS & COUNTER-TERRORISTS",
      price: 1700,
      picture:
        "https://static.wikia.nocookie.net/cswikia/images/0/03/CSGO_Negev_Inventory.png/revision/latest?cb=20130813203153",
      created_at: "2022-01-18T19:24:21.355Z",
      updated_at: "2022-01-20T18:34:05.367Z",
    },
    {
      id: "2c637072-1357-4fae-b884-80ebacf8ea39",
      name: "NOVA",
      ammo: "8/32",
      killAward: "900(300%)",
      damage: 234,
      firerate: 1,
      recoilControl: 1,
      accurateRange: "3m",
      armorPenetration: 100,
      type: "HEAVY",
      side: "TERRORISTS & COUNTER-TERRORISTS",
      price: 1050,
      picture:
        "https://static.wikia.nocookie.net/cswikia/images/1/11/CSGO_Nova_Inventory.png/revision/latest?cb=20130813200616",
      created_at: "2022-01-18T19:20:09.751Z",
      updated_at: "2022-01-20T18:34:43.967Z",
    },
  ];
  let gunTypes: string[] = [];

  for (let i = 0; i < guns.length; i++) {
    gunTypes[i] = guns[i].type;
  }

  const selectGun = (id: string) => {
    for (let i = 0; i < sixGuns.length; i++) {
      if (sixGuns[i].id === id) {
        setSelectedGun(sixGuns[i]);
      }
    }
  };

  const splitFunction = (url: string) => {
    let word = url.split(".png");
    return word[0] + ".png";
  };

  function removeDuplicates(arr: string[]) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  gunTypes = removeDuplicates(gunTypes);

  return (
    <div className="loadout-container">
      <div className="title">
        <h1>CSGO Guns</h1>
      </div>
      <div className="types">
        {gunTypes.map((type) => {
          return <button key={type}>{type}</button>;
        })}
      </div>

      <div className="loadout">
        <div className="circle">
          {sixGuns.map((gun) => {
            return (
              <div
                key={gun.id}
                className="pie"
                onClick={() => {
                  selectGun(gun.id);
                }}
              >
                <div className="pie-color"></div>
                <h1>sucesso</h1>
              </div>
            );
          })}

          {sixGuns.map((gun) => {
            return (
              <>
                <p
                  style={{ display: "flex", flexDirection: "column" }}
                  key={gun.id}
                  onClick={() => {
                    selectGun(gun.id);
                  }}
                >
                  {gun.name}
                  <img
                    style={{ height: "auto", width: "50px" }}
                    src={splitFunction(gun.picture)}
                    alt=""
                  />
                </p>
              </>
            );
          })}
        </div>
      </div>
      <div className="data">
        <img src={splitFunction(selectedGun.picture)} alt="" />
        <p id="name">{selectedGun.name}</p>
        <div className="data-item">
          <p>Ammo</p>
          <p>{selectedGun.ammo}</p>
        </div>
        <div className="data-item">
          <p>Kill Award</p>
          <p>{selectedGun.killAward}</p>
        </div>
        <div className="data-item">
          <p>Firerate</p>
          <p>{selectedGun.firerate}</p>
        </div>
        <div className="data-item">
          <p>Recoil Control</p>
          <p>{selectedGun.recoilControl}</p>
        </div>
        <div className="data-item">
          <p>Accurate Range</p>
          <p>{selectedGun.accurateRange}</p>
        </div>
        <div className="data-item">
          <p>Armor Penetration</p>
          <p>{selectedGun.armorPenetration}</p>
        </div>
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
