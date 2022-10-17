import ICONS from "@navikt/ds-icons/meta.json";
import useSWR from "swr";
import { Layout } from "../../comps/Layout";
import { fetcher } from "../../lib/fetcher";

const Eksempel = () => {
  const { data, error } = useSWR(`/api/breakpoints`, fetcher);

  if (error) {
    console.log(error);
    return <Layout>failed to load </Layout>;
  }
  if (!data) return <Layout>loading...</Layout>;

  return (
    <Layout>
      <div>
        <div className="grid gap-2 mb-16"></div>
        <h2 className="text-xl mb-4">Heading</h2>
        <div className="grid gap-2 mb-16"></div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      icons: ICONS.map((x) => x.name),
    },
  };
}

export default Eksempel;
