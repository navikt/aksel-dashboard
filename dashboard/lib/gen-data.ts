import { readFileSync } from "fs";
import fs from "fs";

const dirName = "./data/";

const getFileNames = () => {
  return fs.readdirSync(dirName);
};

export const getFile = async () => {
  const names = getFileNames();

  let summary: any = null;

  if (names?.[0]) {
    try {
      const temp = readFileSync(`${dirName}${names[0]}`).toString();
      summary = JSON.parse(temp);
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
