import { readFileSync } from "fs";

let summary: any = null;

export const getFile = () => {
  if (!summary) {
    summary = readFileSync("../generator/out/summary.json").toString();
    summary = JSON.parse(summary);
  }
  return summary;
};

export const generatePaths = (type: "element" | "komponenter") => {
  const file = getFile();
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
    default:
      break;
  }

  return {
    paths,
    fallback: false,
  };
};
