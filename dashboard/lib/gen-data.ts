import { readFileSync } from "fs";
import { downloadFiles } from "./bucket";
import fs from "fs";

const getFileNames = () => {
  return fs.readdirSync("../tmp/");
};

export const getFile = async () => {
  await downloadFiles();
  const names = getFileNames();

  let summary: any = null;

  if (names?.[0]) {
    try {
      const temp = readFileSync(`../tmp/${names[0]}`).toString();
      console.log("Read summary data");
      summary = JSON.parse(temp);
      console.log("Parsed summary data");
    } catch (error) {
      throw new Error(
        `Failed parsing\n ${
          (error as any)?.message
        }\n Summary: ${!!summary} \n Names: ${names.join(" II ")}`
      );
    }
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
          paths.push({ params: { element: [name, x.toLowerCase()] } })
        );
      });
      break;
    case "komponenter":
      file.komponenter.forEach(({ name, val }: { name: string; val: any }) => {
        paths.push({ params: { element: [name] } });
        Object.keys(val.props)?.forEach((x) =>
          paths.push({ params: { element: [name, x.toLowerCase()] } })
        );
      });
      break;
    case "ikoner":
      file.ikoner.forEach(({ name, val }: { name: string; val: any }) => {
        paths.push({ params: { element: [name] } });
        Object.keys(val.props)?.forEach((x) =>
          paths.push({ params: { element: [name, x.toLowerCase()] } })
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
