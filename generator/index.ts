import console from "console";
import * as dotenv from "dotenv";
import { cloneRepos } from "./clone-repos.js";
import { searchForRepos } from "./search-repos.js";
dotenv.config({ path: "../.env" });

const validateTokens = () => {
  if (!process.env.TOKEN) {
    throw new Error("Could not read TOKEN in .env");
  }
};

const main = async () => {
  if (process.env.FULL) {
    const repos = await searchForRepos();
    await cloneRepos(repos);
    console.log(`Repos: ${repos.length}`);
  } else {
    console.log("Skipped cloning");
  }

  console.log("Done");
};

try {
  validateTokens();
  main();
} catch (e) {
  console.error(e);
}
