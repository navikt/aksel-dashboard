import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { DangerBar, NeutralBar } from "../../comps/Bar";
import { Layout } from "../../comps/Layout";
import { fetcher } from "../../lib/fetcher";

const Eksempel: NextPage = () => {
  const { data, error } = useSWR(`/api/summary/komponenter`, fetcher);

  if (error) {
    console.log(error);
    return <Layout>failed to load </Layout>;
  }
  if (!data) return <Layout>loading...</Layout>;

  const mostUsed = [...data].sort((a, b) => (a.uses > b.uses ? -1 : 1))[0]
    ?.uses;

  const mostUsedProps = [...data].sort((a, b) =>
    a.props > b.props ? -1 : 1
  )[0]?.props;

  const mostOverriden = [...data].sort((a, b) =>
    a.overrides > b.overrides ? -1 : 1
  )[0]?.overrides;

  return (
    <Layout>
      <div className="grid gap-2">
        {data.map((x) => {
          return (
            <Link key={x.name} href={`/komponenter/${x.name}`} passHref>
              <a className="grid gap-12 grid-cols-4 p-3 bg-gray-800 rounded hover:bg-gray-700">
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
                <div className="grid gap-1">
                  <span className="text-sm text-gray-400">{`${
                    x.overrides
                  } overrides (${Math.round(
                    (x.overrides / x.uses) * 100
                  )}%)`}</span>
                  <DangerBar
                    percentage={`${Math.round((x.overrides / x.uses) * 100)}%`}
                  />
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default Eksempel;
