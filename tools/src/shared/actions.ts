import path from "path";
import url from "url";

import { name as repo } from "../../../package.json";

type Answers = Record<string, any>;

/* Actions Utilities */
const ESCAPE_COMMENTS = /\/\*[\s\S]*?\*\//g;

const ROOT_PATH = url.fileURLToPath(new URL("../..", import.meta.url));
const BUILD_PATH = url.fileURLToPath(new URL(".", import.meta.url));

function transformTSConfig(content: string, { name, kind }: Answers) {
  const tsconfig = JSON.parse(content.replace(ESCAPE_COMMENTS, ""));

  const updatedTsconfig = {
    ...tsconfig,
    compilerOptions: {
      ...tsconfig.compilerOptions,
      paths: {
        ...tsconfig.compilerOptions.paths,
        [`@${repo}/${name}`]: [`${kind}/${name}/src/index.ts`],
      },
    },
  };

  return JSON.stringify(updatedTsconfig, null, "\t");
}

function transformJestConfig(content: string, { name, kind }: Answers) {
  const cleanup = content.replace(/export default /, "");
  const jestconfig = new Function(`return ${cleanup}`)();

  const stringified = JSON.stringify(jestconfig);
  const config = JSON.parse(stringified.replace(ESCAPE_COMMENTS, ""));

  const updatedJestConfig = {
    ...config,
    moduleNameMapper: {
      ...config.moduleNameMapper,
      [`@${repo}/${name}(.*)$`]: `<rootDir>/${kind}/${name}/src/$1`,
    },
  };

  return `export default ${JSON.stringify(updatedJestConfig, null, "\t")}`;
}

function createFile(name: string, generator: string, answers: Answers) {
  return {
    type: "add",
    path: path.join(ROOT_PATH, answers.kind, answers.name, name),
    templateFile: path.join(BUILD_PATH, generator, `${name}.hbs`),
  };
}

function modifyTSConfig(name: string) {
  return {
    type: "modify",
    path: `${ROOT_PATH}/${name}`,
    transform: transformTSConfig,
  };
}

function modifyJestConfig(name: string) {
  return {
    type: "modify",
    path: `${ROOT_PATH}/${name}`,
    transform: transformJestConfig,
  };
}

export { ROOT_PATH, BUILD_PATH };
export { modifyTSConfig, modifyJestConfig, createFile };
