import { getFile } from "../../../lib";
import { validate } from "../../../lib/validate-data";

export default async function handler(req, res) {
  const file = await getFile().then((x) => x[req.query.type]);

  let summary;

  /* switch (req.query.type) {
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
  } */
  res.status(200).json(
    {
      val: validate(),
      file: !!file,
      l: Object?.keys?.(file),
      l2: file?.length,
      t: req.query.type,
    } ?? []
  );
}
