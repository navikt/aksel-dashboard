import { getFile } from "../../lib";
import color from "color";
import { kebabCase } from "lodash";

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

  tags.push("bg");
  for (let tag of tags) {
    const l =
      tag === "bg"
        ? [
            ...file.css.declarations["background-color"],
            ...file.css.declarations["background"],
          ]
        : file.css.declarations[tag];
    tag;
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

  const data = Object.keys(filtered)
    .map((x) => ({
      tag: x,
      values: Object.keys(filtered[x])
        .map((y) => ({
          name: y,
          uses: filtered[x][y],
        }))
        .sort((a, b) => (a.uses > b.uses ? -1 : 1)),
    }))
    .filter((x) => !x.tag.includes("background"));

  res.status(200).json(data ?? {});
}
