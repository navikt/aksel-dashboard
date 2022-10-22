import { readFileSync } from "fs";
import fs from "fs";
import { Convert, DataT } from "./types";

const dirName = "./data/";

const getFileNames = () => {
  return fs.readdirSync(dirName);
};

export const getFile = async (): Promise<DataT> => {
  const names = getFileNames();

  let summary: DataT;

  if (names?.[0]) {
    try {
      const temp = readFileSync(`${dirName}${names[0]}`).toString();
      summary = Convert.toDataT(temp);
      return summary;
    } catch (error) {
      throw new Error(`Failed parsing\n ${(error as any)?.message}`);
    }
  } else {
    throw new Error(`Could not get any file`);
  }
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
