import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";

const config = {
  code: "ds-react",
  file: "package.json",
  org: "navikt",
  lastUpdated: 180,
};

export type RepoT = {
  id: number;
  name: string;
  archived?: boolean;
  disabled?: boolean;
  pushed_at?: Date;
};

const octokit = Octokit.plugin(paginateRest);

export const searchForRepos = async () => {
  const MyOctokit = new octokit({
    auth: process.env.TOKEN,
    userAgent: "Aksel Dashboard",
  });

  const res = await MyOctokit.paginate("GET /search/code", {
    per_page: 100,
    q: `${config.code}+filename:${config.file}+user:${config.org}`,
  }).then((r) => r?.map(({ repository: { id, name } }) => ({ id, name })));

  const allRepos = await MyOctokit.paginate("GET /orgs/navikt/repos", {
    per_page: 100,
  }).then((r) =>
    (r as RepoT[]).map(({ name, archived, disabled, id, pushed_at }) => ({
      name,
      archived,
      disabled,
      id,
      pushed_at,
    }))
  );

  /* Filter out unwanted repos */
  return res
    .map(({ id, ...r }) => {
      return { ...r, id, ...allRepos.find((x) => x.id === id) };
    })
    .filter((x) => !x.disabled && !x.archived)
    .filter((x) => {
      if (!x.pushed_at) {
        return false;
      }

      return (
        Math.round(
          (new Date().getTime() - new Date(x.pushed_at).getTime()) /
            (1000 * 3600 * 24)
        ) < config.lastUpdated
      );
    })
    .filter((v, i, a) => a.findIndex((v2) => v2.name === v.name) === i);
};
