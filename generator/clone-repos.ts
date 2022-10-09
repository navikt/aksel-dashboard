import fs from "fs";
import simpleGit from "simple-git";
import { RepoT } from "./search-repos";

const repoLocation = "./repos";

export const cloneRepos = async (repos: RepoT[]) => {
  !fs.existsSync(repoLocation) && fs.mkdirSync(repoLocation);

  const git = simpleGit({
    baseDir: repoLocation,
    binary: "git",
    maxConcurrentProcesses: 10,
  });

  await Promise.all(
    repos.map((repo) =>
      git.clone(
        `https://${process.env.TOKEN}:x-oauth-basic@github.com/navikt/${repo.name}`,
        repo.name,
        { "--depth": 1 }
      )
    )
  );
};
