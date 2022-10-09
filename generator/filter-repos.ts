import fglob from "fast-glob";
import fs from "fs/promises";
import fsSync from "fs";
import semver from "semver";

export const getPackageJsons = async (dirs: string[]) => {
  const res = [];

  for (const r of dirs) {
    const files = await fglob([`${r}/**/package.json`, "!**/node_modules/**"], {
      dot: true,
      concurrency: 5,
    });
    res.push({ src: r, files });
  }
  return res;
};

type DepT = { [key: string]: string };

const packages = ["@navikt/ds-react", "@navikt/ds-icons"];

/* Lets check if package-jsons uses v1 or newer */
const findDsDependency = (
  files: {
    dependencies?: DepT;
    devDependencies?: DepT;
    peerDependencies?: DepT;
  }[]
): boolean => {
  const checkPackage = (dep: DepT = {}, pack: string) => {
    if (pack in dep) {
      return (
        (semver.coerce(dep[pack])?.major ?? 0 >= 1) ||
        dep[pack] === "latest" ||
        dep[pack] === "*"
      );
    }

    return false;
  };

  for (const opt of files) {
    for (const pack of packages) {
      if (
        checkPackage(opt.dependencies, pack) ||
        checkPackage(opt.devDependencies, pack) ||
        checkPackage(opt.peerDependencies, pack)
      ) {
        return true;
      }
    }
  }
  return false;
};

/* Lets remove dir if we cant fint ds-packages >= v1.0.0 */
export const filterBasedOnPackage = async (
  files: { src: string; files: string[] }[]
) => {
  for (const opt of files) {
    const jsonFiles = await Promise.all(
      opt.files.map((file) => fs.readFile(file))
    ).then((res) => res.map((x) => JSON.parse(x.toString())));

    const found = findDsDependency(jsonFiles);
    if (!found) {
      console.log(`rm unwanted repo: ${opt.src}`);
      fsSync.rmSync(opt.src, { force: true, recursive: true });
    }
  }
};
