import ICONS from "@navikt/ds-icons/meta.json";
import Link from "next/link";
import useSWR from "swr";
import { NeutralBar } from "../../comps/Bar";
import { Layout } from "../../comps/Layout";
import { fetcher } from "../../lib/fetcher";

const Eksempel = ({ icons }: { icons: string[] }) => {
  const { data, error } = useSWR(`/api/summary/ikoner`, fetcher);

  if (error) return <Layout>failed to load </Layout>;
  if (!data) return <Layout>loading...</Layout>;

  const mostUsed = [...data].sort((a, b) => (a.uses > b.uses ? -1 : 1))[0]
    ?.uses;

  const mostUsedProps = [...data].sort((a, b) =>
    a.props > b.props ? -1 : 1
  )[0]?.props;

  const notUsed = icons.filter((x) => !data.find((y) => y.name === x));

  return (
    <Layout>
      <div>
        <div className="grid gap-2 mb-16">
          {data.map((x) => {
            return (
              <Link key={x.name} href={`/ikoner/${x.name}`} passHref>
                <a className="grid gap-12 grid-cols-3 p-3 bg-gray-800 rounded hover:bg-gray-700">
                  <span className="text-lg ">{`<${x.name}>`}</span>
                  <div className="grid gap-1">
                    <span className="text-sm text-gray-400">{`${x.uses} uses`}</span>
                    <NeutralBar percentage={`${(x.uses / mostUsed) * 100}%`} />
                  </div>
                  <div className="grid gap-1">
                    <span className="text-sm text-gray-400">{`${x.props} props`}</span>
                    <NeutralBar
                      percentage={`${(x.props / mostUsedProps) * 100}%`}
                    />
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <h2 className="text-xl mb-4">Not used: {notUsed.length}</h2>
        <div className="grid gap-2 mb-16">
          {notUsed.map((x) => {
            return (
              <div
                key={x}
                className="grid gap-12 grid-cols-3 p-3 bg-gray-800 rounded "
              >
                <span className="text-lg">{`<${x}>`}</span>
              </div>
            );
          })}
        </div>
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
