import console from "console";
import * as dotenv from "dotenv";
import { searchRepos } from "./git";

dotenv.config({ path: "../.env" });

const validateTokens = () => {
  if (!process.env.TOKEN) {
    throw new Error("Could not read TOKEN in .env");
  }
};

const main = async () => {
  await searchRepos();

  console.log("Completed");
  return null;
};

try {
  validateTokens();
  main();
} catch (e) {
  console.error(e);
}
