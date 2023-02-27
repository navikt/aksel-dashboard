import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../comps/Layout";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/komponenter");
  });
  return <Layout>abc</Layout>;
};

export default Home;
