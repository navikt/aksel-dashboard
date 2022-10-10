/* eslint-disable react/display-name */
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";
import useSWR from "swr";
import { NeutralBar } from "../../comps/Bar";
import { Layout } from "../../comps/Layout";
import { generatePaths } from "../../lib";
import { fetcher } from "../../lib/fetcher";

const Eksempel = ({ name }: { name: string }) => {
  const [hide, setHide] = useState(false);
  const [distance, setDistance] = useState(100);
  const { data, error } = useSWR(`/api/tag/elementer/${name}`, fetcher);

  if (error) return <Layout>failed to load {name}</Layout>;
  if (!data) return <Layout>loading...</Layout>;

  return (
    <Layout>
      <div>
        <h1 className="text-3xl mb-3 font-semibold">{`<${name}>`}</h1>
        <h2 className="text-xl mb-4">{`Used ${data.val.uses} times`}</h2>
        <div className="grid gap-2 mb-16">
          {Object.keys(data.val.props).map((x) => {
            return (
              <div
                key={x}
                className="grid grid-cols-1 p-3 bg-gray-800 rounded hover:bg-gray-700"
              >
                <div className="grid gap-1">
                  <span className="text-sm text-gray-400">{`"${x}" is used ${data.val.props[x]} times`}</span>
                  <NeutralBar
                    percentage={`${(data.val.props[x] / 1000) * 100}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="text-xl mb-4">
          Files{" "}
          {/* <button className="ml-2 text-sm" onClick={() => setHide((x) => !x)}>
            {`${hide ? "show" : "hide"} visited`}
          </button> */}
        </h2>
        <div
          className="grid gap-2 max-h-[1000px] overflow-scroll parent"
          data-hide={hide}
        >
          {data?.val?.instances.slice(0, distance).map((x, y) => {
            const link = x.location.file.split("generator/repos/")[1];
            const [repo, ...rest] = link.split("/");
            const href = `https://github.com/navikt/${repo}/blob/master/${rest.join(
              "/"
            )}#L${x.location.start.line}`;

            return (
              <Link href={href} passHref key={y}>
                <a
                  target="_blank"
                  className="text-sm visited:text-purple-400 text-gray-400 p-3 bg-gray-800 rounded hover:bg-gray-700"
                >
                  {`${link}#L${x.location.start.line}`}
                </a>
              </Link>
            );
          })}
          {data?.val?.instances?.length > distance && (
            <button onClick={() => setDistance((x) => x + 100)}>
              Show more
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
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
