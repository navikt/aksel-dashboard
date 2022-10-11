import { readFileSync } from "fs";
import { downloadFiles } from "./bucket";
import fs from "fs";

let summary: any = null;

const getFileNames = () => {
  return fs.readdirSync("./data/");
};

export const getFile = async () => {
  await downloadFiles();
  const names = getFileNames();

  if (!summary && names?.[0]) {
    summary = readFileSync(`./data/${names[0]}`).toString();
    summary = JSON.parse(summary);
  }

  return summary;
};

export const generatePaths = async (
  type: "element" | "komponenter" | "ikoner"
) => {
  const file = await getFile();
  const paths: any = [];

  switch (type) {
    case "element":
      file.elementer.forEach(({ name, val }: { name: string; val: any }) => {
        paths.push({ params: { element: [name] } });
        Object.keys(val.props)?.forEach((x) =>
          paths.push({ params: { element: [name, x] } })
        );
      });
      break;
    case "komponenter":
      file.komponenter.forEach(({ name, val }: { name: string; val: any }) => {
        paths.push({ params: { element: [name] } });
        Object.keys(val.props)?.forEach((x) =>
          paths.push({ params: { element: [name, x] } })
        );
      });
      break;
    case "ikoner":
      file.ikoner.forEach(({ name, val }: { name: string; val: any }) => {
        paths.push({ params: { element: [name] } });
        Object.keys(val.props)?.forEach((x) =>
          paths.push({ params: { element: [name, x] } })
        );
      });
      break;
    default:
      break;
  }

  return {
    paths,
    fallback: false,
  };
};
