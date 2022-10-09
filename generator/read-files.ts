import fglob from "fast-glob";
import { filterBasedOnPackage, getPackageJsons } from "./filter-repos.js";

const getDirs = () =>
  fglob(`repos/*`, {
    onlyFiles: false,
    deep: 1,
    onlyDirectories: true,
    concurrency: 5,
  }).then((dirs) => {
    if (dirs.length === 0) {
      throw new Error("Could not find any repos to read from");
    }
    return dirs;
  });

export const readFiles = async () => {
  const dirs = await getDirs();
  const packageJsons = await getPackageJsons(dirs);
  await filterBasedOnPackage(packageJsons);

  /* console.log(packageJsons); */
};

//
// const files = await fglob(
//   [`**/package.json`, "!**/node_modules/**", `!**/*.(spec|test).*`],
//   {
//     dot: true,
//     concurrency: 5,
//   }
// );
