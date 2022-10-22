import { getFile } from "../../lib";
import color from "color";

const filter = [
  "#",
  "rgb",
  "hsl",
  "var(--navds-global",
  "var(--navds-semantic",
  "transparent",
];
const decl = ["background", "background-color", "color", "border-color"];
export default async function handler(req, res) {
  const file = await getFile();

  const tags = Object.keys(file.css.declarations)
    .filter((x) => !x.startsWith("-"))
    .filter((x) => decl.find((y) => y === x));

  const filtered = {};

  for (let tag of tags) {
    const l = file.css.declarations[tag];
    const hist = {};
    l.filter((x) => filter.find((y) => x.startsWith(y))).map(function (a) {
      try {
        const c = color(a).rgb();
        if (c in hist) hist[c]++;
        else hist[c] = 1;
      } catch (error) {
        if (a in hist) hist[a]++;
        else hist[a] = 1;
      }
    });
    filtered[tag] = hist;
  }

  res.status(200).json(filtered ?? {});
}
