import { NextPage } from "next";
import { Layout } from "../../comps/Layout";

const Eksempel: NextPage = () => {
  return <Layout>abc123</Layout>;
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Eksempel;
