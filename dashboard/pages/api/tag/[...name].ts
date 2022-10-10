import { getFile } from "../../../lib";

export default function handler(req, res) {
  const file = getFile()[req.query.name[0]];

  const el = file.find((x) => x.name === req.query.name[1]);
  res.status(200).json(el);
}
