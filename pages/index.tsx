import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

import "bootswatch/dist/darkly/bootstrap.min.css";

import { Gun } from "../types";

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
  //* ====================== Use State======================
  const [extraGun, setExtraGun] = useState<Gun | null>(null);
  const [filterSide, setFilterSide] = useState("TERRORISTS");
  const [filterType, setFilterType] = useState("RIFLE");
  const [selectedGun, setSelectedGun] = useState<Gun>(guns[25]); //* AK

  const [sixGuns, setSixGuns] = useState<Gun[]>(guns.slice(0, 6));

  useEffect(() => {
    filterGuns();
  }, [filterSide, filterType]);

  const filterGuns = () => {
    let temp = guns;

    temp = guns.filter((gun) => gun.type === filterType);

    if (filterSide === "TERRORISTS") {
      temp = temp.filter((gun) => gun.side.includes(filterSide));
      temp = temp.filter((gun) => !(gun.side.length == 18));
    }
    if (filterSide === "COUNTER-TERRORISTS") {
      temp = temp.filter((gun) => gun.side.includes(filterSide));
      temp = temp.filter((gun) => !(gun.side.length == 10));
    }

    if (temp.length == 7) {
      setExtraGun(temp[6]);
      temp.pop();
    } else {
      setExtraGun(null);
    }

    console.log(temp);
    setSixGuns(temp);
  };

  let gunTypes: string[] = [];

  for (let i = 0; i < guns.length; i++) {
    gunTypes[i] = guns[i].type;
  }

  const selectGun = (id: string) => {
    for (let i = 0; i < guns.length; i++) {
      if (guns[i].id === id) {
        setSelectedGun(guns[i]);
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
      <div className="filters">
        <div className="types">
          {gunTypes.map((type) => {
            return (
              <button
                className={type === filterType ? "selected" : "notSelected"}
                key={type}
                onClick={() => {
                  setFilterType(type);
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
        <div className="sides">
          <img
            className={filterSide === "TERRORISTS" ? "selected" : "notSelected"}
            src="https://2.bp.blogspot.com/-fhx4dhePSGQ/WdtNzaf0HBI/AAAAAAAALCE/HDUfau2G97YZ5_LZrH_VaYS8VOyQeMP1QCLcBGAs/s1600/logo_TR_csgo.png"
            alt=""
            onClick={() => {
              setFilterSide("TERRORISTS");
            }}
          />
          <img
            className={
              filterSide === "COUNTER-TERRORISTS" ? "selected" : "notSelected"
            }
            src="https://static.wikia.nocookie.net/cswikia/images/4/4c/Csgo_CT_icon_alt.png"
            alt=""
            onClick={() => {
              setFilterSide("COUNTER-TERRORISTS");
            }}
          />
        </div>
      </div>
      <div className="loadout-data">
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
                </div>
              );
            })}
            <div className="names-images">
              {sixGuns.map((gun) => {
                return (
                  <p
                    style={{ display: "flex", flexDirection: "column" }}
                    key={gun.id}
                    onClick={() => {
                      selectGun(gun.id);
                    }}
                  >
                    {gun.name}
                    <img src={splitFunction(gun.picture)} alt="" />
                  </p>
                );
              })}
            </div>
            {extraGun && (
              <p
                id="extra-gun"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => {
                  selectGun(extraGun.id);
                }}
              >
                {extraGun.name}
                <img src={splitFunction(extraGun.picture)} alt="" />
              </p>
            )}
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://csgogunsapi.herokuapp.com/");
  const data: Gun[] = await res.json();

  return { props: { guns: data } };
};

export default Home;
