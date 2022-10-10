import { readFileSync } from "fs";

let summary: any = null;

export const getFile = () => {
  if (!summary) {
    summary = readFileSync("../generator/out/summary.json").toString();
    summary = JSON.parse(summary);
  }
  return summary;
};

export const generatePaths = (type: "element") => {
  const file = getFile();
  const paths: any = [];

  switch (type) {
    case "element":
      file.elementer.forEach(({ name }: { name: string; val: any }) => {
        paths.push({ params: { element: [name] } });
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
