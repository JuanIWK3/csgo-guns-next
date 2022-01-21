import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent, useRef, useState } from "react";

import styles from "../styles/Home.module.css";
import "bootswatch/dist/darkly/bootstrap.min.css";
import { Button, Dropdown, Form, FormControl, Table } from "react-bootstrap";

import { Gun } from "../types";

interface IFilters {
  type: string;
  side: string;
}

const Home: NextPage<{ guns: Gun[] }> = ({ guns }) => {
  const [filteredGuns, setFilteredGuns] = useState<Gun[]>(guns);
  const [price, setPrice] = useState(200);
  const [typeDrop, setTypeDrop] = useState("Types");
  const [sideDrop, setSideDrop] = useState("Sides");
  const [priceDrop, setPriceDrop] = useState("Price");
  const [filters, setFilters] = useState<IFilters>({ type: "", side: "" });
  const allGuns = guns;
  let gunTypes: string[] = [];
  let gunSides: string[] = [];

  for (let i = 0; i < allGuns.length; i++) {
    gunTypes[i] = allGuns[i].type;
  }

  for (let i = 0; i < allGuns.length; i++) {
    gunSides[i] = allGuns[i].side;
  }

  gunTypes = removeDuplicates(gunTypes);

  gunSides = removeDuplicates(gunSides);

  const applyFilters = () => {
    console.log(filters);

    setFilteredGuns(guns);

    if (filters.type !== "") {
      setFilteredGuns(guns.filter((gun) => gun.type === filters.type));
    }

    if (filters.side !== "") {
      setFilteredGuns(guns.filter((gun) => gun.side === filters.side));
    }

    if (filters.side !== "" && filters.type !== "") {
      setFilteredGuns(
        guns.filter(
          (gun) => gun.type === filters.type && gun.side === filters.side
        )
      );
    }
  };

  function removeDuplicates(arr: string[]) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  const removeFilters = () => {
    setFilteredGuns(guns);
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
      <div className="filters">
        <div className="dropdowns">
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {typeDrop}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                id=""
                onClick={(e) => {
                  setTypeDrop("All Types"),
                    setFilters((prevState) => ({ ...prevState, type: "" }));
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
                        const { id } = e.currentTarget;
                        setFilters((prevState) => ({ ...prevState, type: id }));
                        setTypeDrop(id);
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
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {sideDrop}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                id=""
                onClick={(e) => {
                  setSideDrop("All Sides"),
                    setFilters((prevState) => ({ ...prevState, side: "" }));
                }}
              >
                All Sides
              </Dropdown.Item>
              {gunSides.map((side) => {
                return (
                  <>
                    <Dropdown.Item
                      id={side}
                      onClick={(e) => {
                        const { id } = e.currentTarget;
                        setFilters((prevState) => ({ ...prevState, side: id }));
                        setSideDrop(id);
                      }}
                      key={side}
                    >
                      {side}
                    </Dropdown.Item>
                  </>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown className="dropdown">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {priceDrop}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item id="price-drop">
                <FormControl
                  id="price-range"
                  type="range"
                  min="200"
                  max="5200"
                  step="50"
                  name="price"
                  onChange={(e) => {
                    console.log(e.currentTarget.value);
                    setPrice(parseInt(e.currentTarget.value));
                  }}
                />
                <label
                  htmlFor="
                price"
                >
                  {price}
                </label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
        <div className="filter-buttons">
          <Button
            onClick={() => {
              setFilteredGuns(guns);
              applyFilters();
            }}
            id="apply-filters"
            variant="success"
          >
            Apply Filters
          </Button>
          <Button
            onClick={() => {
              removeFilters();
            }}
            id="remove-filters"
            variant="danger"
          >
            Remove Filters
          </Button>
        </div>
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
