import { getFile } from "../../lib";

const regex = new RegExp(/\d*(min-width|max-width):\s*(\d+\s?)(px|rem|em)/g);

export default async function handler(req, res) {
  const file = await getFile();

  const filtered = file.css.mediaQueries.filter((x: string) =>
    ["rem)", "em)", "px)"].some((y) => x.includes(y))
  );

  const all: string[] = [];
  const minMax: string[] = [];
  filtered.forEach((x) => {
    const val = x.match(regex);

    val && val.forEach((y) => all.push(y.split(": ")[1]));
    val && val.forEach((y) => minMax.push(y.split(": ")[0]));
  });

  const breakCounts = {};
  all.forEach(function (x) {
    breakCounts[x] = (breakCounts[x] || 0) + 1;
  });

  const minMaxcounts = {};
  minMax.forEach(function (x) {
    minMaxcounts[x] = (minMaxcounts[x] || 0) + 1;
  });

  const breaks = Object.entries(breakCounts)
    .map(([key, val]) => ({
      val: key,
      used: val as string,
    }))
    .sort((a, b) => (a.used > b.used ? -1 : 1));

  const data = {
    minMax: minMaxcounts,
    breakpoints: breaks,
    unique: breaks.length,
  };

  res.status(200).json(data ?? {});
}
