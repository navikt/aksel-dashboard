import path from "path";
import scanner from "react-scanner";

export const walkTs = async () => {
  await scanner.run({
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
    includeSubComponents: true,
    processors: [
      // Count only component, not props, and save the result to a file
      ["count-components-and-props", { outputTo: "out/components.json" }],
      ["raw-report", { outputTo: "out/raw.json" }],
    ],
  });

  /*   data.forEach((x) => {
    x.files.forEach((file) => {
      const project = new Project();
      const sourceFile = project.addSourceFileAtPath(file);
      console.log(sourceFile.getChildren().map(x => x.name));
    });
  }); */
};
