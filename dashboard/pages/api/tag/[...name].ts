import { getFile } from "../../../lib";

const filterProp = (obj: any, prop: string) => {
  const filtered = obj.val.instances.filter((x) =>
    Object.keys(x.props).includes(prop)
  );
  return {
    ...obj,
    val: { ...obj.val, uses: filtered.length, instances: filtered },
  };
};

export default async function handler(req, res) {
  const file = await getFile().then((x) => x[req.query.name[0]]);
  let prop = req.query.name?.[2];
  const el = file.find((x) => x.name === req.query.name[1]);

  prop === "classname" ? (prop = "className") : prop;
  const out = prop ? filterProp(el, prop) : el;
  res.status(200).json(out ?? []);
}
