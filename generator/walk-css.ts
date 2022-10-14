import path from "path";
import cssstats from "@dimanech/cssstat-core";
import { getCss, getDirs } from "./read-files.js";

const config = {
  rootDir: ".",
  crawlFrom: "repos",
  globs: ["**/*.css"],
  exclude: (dirname: string) => dirname === "node_modules",
  getComponentName: ({
    imported,
    moduleName,
  }: {
    imported: string;
    moduleName: string;
  }) => imported || path.basename(moduleName),
};

export const walkCss = async () => {
  const repos = await getDirs();
  console.log(repos);

  for (let repo of repos) {
    const cssFiles = await getCss(repo);
    console.log(cssFiles.length);
  }
};
