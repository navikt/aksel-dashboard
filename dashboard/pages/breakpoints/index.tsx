import useSWR from "swr";
import { NeutralBar } from "../../comps/Bar";
import { Layout } from "../../comps/Layout";
import { fetcher } from "../../lib/fetcher";

const template = ["448px", "648px", "768px", "960px", "1272px"];

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
        <h2 className="text-xl mb-4">{`${data.unique}`} unique breakpoints</h2>
        <div className="grid gap-2 mb-16">
          {data.breakpoints.map((x) => {
            return (
              <div
                key={x.val}
                className="grid gap-12 grid-cols-2 p-3 bg-gray-800 rounded "
              >
                <span className="text-lg ">{`${x.val} ${
                  template.includes(x.val) ? "(in figma grid)" : ""
                }`}</span>
                <div className="grid gap-1">
                  <span className="text-sm text-gray-400">{`${x.used} uses`}</span>
                  <NeutralBar
                    percentage={`${(x.used / data.breakpoints[0].used) * 100}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="text-xl mb-4">Min/Max</h2>
        <div className="grid gap-2 mb-16">
          <div className="grid gap-12 grid-cols-1 p-3 bg-gray-800 rounded ">
            <span className="text-lg ">{`min-width: ${data.minMax["min-width"]}`}</span>
          </div>
          <div className="grid gap-12 grid-cols-1 p-3 bg-gray-800 rounded ">
            <span className="text-lg ">{`max-width: ${data.minMax["max-width"]}`}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Eksempel;
