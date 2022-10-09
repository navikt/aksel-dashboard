import console from "console";
import * as dotenv from "dotenv";
import { cloneRepos } from "./clone-repos";
import { searchForRepos } from "./search-repos";
dotenv.config({ path: "../.env" });

const validateTokens = () => {
  if (!process.env.TOKEN) {
    throw new Error("Could not read TOKEN in .env");
  }
};

const main = async () => {
  const repos = await searchForRepos();
  cloneRepos(repos.slice(0, 10));

  console.log(`Repos: ${repos.length}`);
  console.log("Done");
};

try {
  validateTokens();
  main();
} catch (e) {
  console.error(e);
}
