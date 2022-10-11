import { Storage } from "@google-cloud/storage";
import fs from "fs";

const bucketName = "aksel-dashboard";

const srcFilename = "path/to/object/to/download/file.format";

const destFilename = "./data/";

const serviceKey = "./key.json";

const storageConf = { keyFilename: serviceKey };

export const getDate = (name: string) =>
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
    return;
  }

  const storage = new Storage(storageConf);

  const [files] = await storage.bucket(bucketName).getFiles();

  const ordered = files
    .filter((x) => x.name !== "v1/out/" && x.name !== "v1/")
    .sort((a, b) => {
      return (
        new Date(getDate(b.name)).getTime() -
        new Date(getDate(a.name)).getTime()
      );
    });

  const fresh = ordered[0];

  await storage
    .bucket(bucketName)
    .file(fresh.name)
    .download({ destination: `./data/${fresh.name.replace("v1/out/", "")}` });

  console.log(
    "The object " +
      srcFilename +
      " coming from bucket " +
      bucketName +
      " has been downloaded to " +
      destFilename
  );
}
