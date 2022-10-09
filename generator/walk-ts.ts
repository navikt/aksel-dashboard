import path from "path";
import scanner from "react-scanner";

const config = {
  rootDir: ".",
  crawlFrom: "repos",
  globs: ["**/!(*.test|*.spec|*.stories|*.story).@(jsx|tsx)"],
  exclude: (dirname: string) => dirname === "node_modules",
  getComponentName: ({
    imported,
    moduleName,
  }: {
    imported: string;
    moduleName: string;
  }) => imported || path.basename(moduleName),
};

export const walkTs = async () => {
  await scanner.run({
    ...config,
    processors: [
      ["count-components-and-props", { outputTo: "out/tags.json" }],
      ["raw-report", { outputTo: "out/raw.json" }],
    ],
  });
  await scanner.run({
    ...config,
    importedFrom: /@navikt\/ds-react/,
    processors: [
      ["count-components-and-props", { outputTo: "out/components.json" }],
    ],
  });
  await scanner.run({
    ...config,
    importedFrom: /@navikt\/ds-icons/,
    processors: [["count-components", { outputTo: "out/icons.json" }]],
  });
};
