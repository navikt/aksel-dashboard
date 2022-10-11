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

export default function handler(req, res) {
  const file = getFile()[req.query.name[0]];
  const prop = req.query.name?.[2];
  const el = file.find((x) => x.name === req.query.name[1]);

  const out = prop ? filterProp(el, prop) : el;
  res.status(200).json(out ?? []);
}
