import { getFile } from "../../../lib";

export default function handler(req, res) {
  const file = getFile().elements;
  const el = file.find((x) => x.name === req.query.name);
  res.status(200).json(el);
}
