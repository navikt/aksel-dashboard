import { Storage } from "@google-cloud/storage";
import fs from "fs";

const bucketName = "aksel-dashboard";

const destFilename = "./dashboard/data/";

export const getDate = (name) =>
  name
    .replace(".json", "")
    .replace("v1/out/summary-", "")
    .split("-")
    .reverse()
    .join(".");

export async function downloadFiles() {
  !fs.existsSync(destFilename) && fs.mkdirSync(destFilename);

  const res = fs.readdirSync(destFilename);

  if (res.length > 0) {
    console.log("Skipped bucket download");
    return;
  }

  const storage = new Storage({ keyFilename: "./key.json" });

  const [files] = await storage.bucket(bucketName).getFiles();

  const ordered = files
    .filter((x) => x.name !== "v1/out/" && x.name !== "v1/")
    .sort((a, b) => {
      return new Date(getDate(a.name)).getTime() -
        new Date(getDate(b.name)).getTime() >
        0
        ? 1
        : -1;
    });

  const fresh = ordered[0];

  await storage
    .bucket(bucketName)
    .file(fresh.name)
    .download({
      destination: `${destFilename}${fresh.name.replace("v1/out/", "")}`,
    });
}

await downloadFiles();
