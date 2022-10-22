import { getFile } from "../../../lib";

const overrides = ["className", "style"];

export default async function handler(req, res) {
  const file = await getFile().then((x) => x[req.query.type]);

  let summary;

  switch (req.query.type) {
    case "elementer":
      summary = file
        .map((x) => ({
          name: x.name,
          uses: x.val.uses,
          props: Object.keys(x.val.props).length,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "komponenter":
      summary = file
        .map((x) => ({
          name: x.name,
          uses: x.val.uses,
          props: Object.keys(x.val.props).length,
          overrides: Object.entries(x.val.props).reduce((cur, [key, val]) => {
            return overrides.includes(key) ? cur + (val as number) : cur;
          }, 0),
        }))
        .sort((a, b) => (a.uses > b.uses ? -1 : 1));
      break;
    case "ikoner":
      summary = file
        .map((x) => ({
          name: x.name,
          uses: x.val.uses,
          props: Object.keys(x.val.props).length,
        }))
        .sort((a, b) => (a.uses > b.uses ? -1 : 1));
      break;
    default:
      break;
  }
  res.status(200).json(summary ?? []);
}
