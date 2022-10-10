import useSWR from "swr";
import { Layout } from "../../comps/Layout";
import { generatePaths } from "../../lib";
import { fetcher } from "../../lib/fetcher";

const Eksempel = ({ name }: { name: string }) => {
  const { data, error } = useSWR(`/api/data/${name}`, fetcher);

  if (error) return <Layout>failed to load {name}</Layout>;
  if (!data) return <Layout>loading...</Layout>;

  return <Layout> {data.name}</Layout>;
};

export const getStaticPaths = async () => generatePaths("element");

export async function getStaticProps({ params: { element } }) {
  return {
    props: {
      name: element[0],
    },
  };
}

export default Eksempel;
