import cl from "clsx";
import { useState } from "react";
import useSWR from "swr";
import { Layout } from "../../comps/Layout";
import { fetcher } from "../../lib/fetcher";

const Eksempel = () => {
  const { data, error } = useSWR(`/api/color`, fetcher);

  if (error) {
    return <Layout>failed to load </Layout>;
  }
  if (!data) return <Layout>loading...</Layout>;

  return (
    <Layout>
      <div>
        {data.map((tag, y) => {
          return (
            <div key={y}>
              <h2 className="text-xl mb-4">{`${tag.tag.replace(
                "bg",
                "background"
              )} (${tag.values.length})`}</h2>
              <div className="grid gap-2 mb-16">
                {tag.values.map((val) => (
                  <div
                    key={val.name}
                    className="grid gap-12 grid-cols-3 p-3 bg-gray-800 rounded "
                  >
                    <span className="text-gray-400 text-md flex justify-between">
                      {val.name}
                    </span>
                    <span className="text-gray-200 text-end">{`${val.uses} uses`}</span>

                    <div
                      style={{ background: val.name }}
                      className="-my-3 -mr-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Eksempel;
