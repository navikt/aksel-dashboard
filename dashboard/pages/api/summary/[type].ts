import { getFile } from "../../../lib";

export default function handler(req, res) {
  const file = getFile()[req.query.type];

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
    case "komponenter":
      summary = file
        .map((x) => ({
          name: x.name,
          uses: x.val.uses,
          props: Object.keys(x.val.props).length,
        }))
        .sort((a, b) => (a.uses > b.uses ? -1 : 1));
    case "ikoner":
      summary = file
        .map((x) => ({
          name: x.name,
          uses: x.val.uses,
          props: Object.keys(x.val.props).length,
        }))
        .sort((a, b) => (a.uses > b.uses ? -1 : 1));
    default:
      break;
  }
  res.status(200).json(summary ?? []);
}
