import fglob from "fast-glob";

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

const readTSJS = async () => {
  const dirs = await getDirs();
  const res = [];

  for (const r of dirs) {
    const files = await fglob(
      [
        `${r}/**/*.{tsx,jsx}`,
        "!**/node_modules/**",
        `!**/*.(spec|test|stories|story).*`,
      ],
      {
        dot: true,
        concurrency: 5,
      }
    );
    res.push({ src: r, files });
  }
  return res;
};

export const readFiles = async () => {
  const dirs = await getDirs();
  console.log(`Directories: ${dirs.length}`);

  return { ts: await readTSJS() };
};
