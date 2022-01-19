import { Gun } from "../../types";

function GunPage({ gun }: { gun: Gun }) {
  return <h1>{gun.name}</h1>;
}

export async function getStaticPaths() {
  const res = await fetch("https://csgogunsapi.herokuapp.com/");
  const data: Gun[] = await res.json();

  return {
    paths: data.map((gun) => {
      return { params: { id: String(gun.id) } };
    }),
  };
}

export async function getStaticProps({ params }: { params: { id: String } }) {
  const res = await fetch(`https://csgogunsapi.herokuapp.com/${params.id}`);
  const gun = res.json();
  return {
    props: {
      gun,
    },
  };
}

export default GunPage;
