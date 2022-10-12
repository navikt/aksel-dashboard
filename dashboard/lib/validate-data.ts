import fs, { readFileSync } from "fs";

const dirName = "./data/";

export const validate = () => {
  let out = "";
  try {
    const files = fs.readdirSync(dirName);
    out += `${files.join("|")}\n`;
    const data = readFileSync(`${dirName}${files[0]}`).toString();
    out += `length: ${data.length}\n`;
    const parsed = JSON.parse(data);
    out += `parsed: ${!!parsed}\n`;
  } catch (e) {
    return `${out}\nError: ${(e as Error).message}`;
  }
  return out;
};
