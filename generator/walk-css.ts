import cssstats from "@dimanech/cssstat-core";
import _ from "lodash";

import { getCss, getDirs, readFile, writeJson } from "./read-files.js";

const getStats = (css: string, file: string) => {
  let stats: any = {};
  try {
    stats = cssstats(css);
  } catch (e) {
    return {
      mediaQueries: [],
      selectors: [],
      declarations: {},
    };
  }

  const media = stats?.mediaQueries?.values ?? [];

  const selectors =
    stats?.selectors?.values
      .filter((x: string) => x.includes(".navds-"))
      .map((x: string) => ({ file: file.replace("./repos/", ""), val: x })) ??
    [];

  const declarations = stats?.declarations?.properties ?? {};

  return {
    mediaQueries: media,
    selectors,
    declarations,
  };
};

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const concatStats = (stats: any[]) =>
  stats.reduce(
    (cur, val) => {
      if (!val) {
        return cur;
      }
      return {
        mediaQueries: [
          ...cur?.mediaQueries,
          ...(val?.mediaQueries ? val?.mediaQueries : []),
        ],
        selectors: [
          ...cur?.selectors,
          ...(val?.selectors ? val?.selectors : []),
        ],
        declarations: _.mergeWith(
          cur?.declarations,
          val?.declarations,
          customizer
        ),
      };
    },
    { mediaQueries: [], selectors: [], declarations: {} }
  );

const parseCss = async (files: string[]) => {
  const stats = [];
  for (let file of files) {
    const css = await readFile(file);
    stats.push(getStats(css, file));
  }
  return concatStats(stats);
};

export const walkCss = async () => {
  const repos = (await getDirs()).filter((x) => !x.includes("aksel/@navikt"));

  const res = [];

  for (let repo of repos) {
    const cssFiles = await getCss(repo);
    if (cssFiles.length > 0) {
      res.push(await parseCss(cssFiles));
    }
  }

  let t = concatStats(res);
  t = {
    ...t,
    selectors: t.selectors.filter(
      (x: any) =>
        !x.file.includes("aksel/@navikt/core") &&
        !x.file.includes("build/static/css")
    ),
  };

  await writeJson(t, "./out/css.json");
};
