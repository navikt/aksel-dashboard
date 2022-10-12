import { Layout } from "../comps/Layout";
import { validate } from "../lib/validate-data";

const Home = ({ res }: { res: any }) => {
  console.log(res);
  return <Layout>abc</Layout>;
};

export async function getStaticProps() {
  const res = validate();
  return {
    props: {
      res,
    },
  };
}

export default Home;
