import fglob from "fast-glob";
import fs from "fs/promises";

export const getDirs = () =>
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

export const readJson = async (name: string): Promise<any> =>
  fs.readFile(name).then((x) => JSON.parse(x.toString()));

export const writeJson = async (data: any, out: string) =>
  fs.writeFile(out, JSON.stringify(data));

export const readFile = async (file: string) =>
  fs.readFile(file).then((x) => x.toString());

export const getCss = (repo: string) =>
  fglob(`./${repo}/**/*.css`, {
    concurrency: 5,
  }).then((files) => {
    if (files.length === 0) {
      console.log(`Could not find any css in: ${repo}/**/*.{css}`);
    }
    return files;
  });
