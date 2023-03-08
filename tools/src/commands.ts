import child_process from "child_process";
import path from "path";
import url from "url";

import { transformJestConfig, transformTSConfig } from "./utils";

const ROOT_PATH = url.fileURLToPath(new URL("../..", import.meta.url));
const BUILD_PATH = url.fileURLToPath(new URL(".", import.meta.url));

type Answers = Record<string, any>;

/* Custom Commands */
function pnpm(_: Answers, config: Record<string, string>) {
  return new Promise<string>((resolve, reject) => {
    const pnpm = child_process.spawn("pnpm", ["i"], { cwd: config.path });

    pnpm.stdout.on("close", () => {
      resolve("Pnpm install has run successfully!");
    });

    pnpm.stdout.on("error", (err) => {
      reject(`Pnpm install has failed! Error: ${JSON.stringify(err)}.`);
    });
  });
}

function pnpmInstall() {
  return {
    type: "pnpm",
  };
}
/* Custom Commands */

/* TSup Commands */
function createTsupFiles(generator: string, answers: Answers) {
  const files = ["src/index.ts"] as const;
  const tools = [
    "tsup.config.ts",
    "jest.config.ts",
    "tsconfig.json",
    "package.json",
    ".eslintrc",
  ] as const;

  return [...files, ...tools].map((file) => ({
    type: "add",
    path: path.join(ROOT_PATH, answers.kind, answers.name, file),
    templateFile: path.join(BUILD_PATH, generator, `${file}.hbs`),
  }));
}
/* TSup Commands */

/* Shared Commands */
function modifyTSConfig() {
  return {
    type: "modify",
    path: `${ROOT_PATH}/tsconfig.base.json`,
    transform: transformTSConfig,
  };
}

function modifyJestConfig() {
  return {
    type: "modify",
    path: `${ROOT_PATH}/jest.config.ts`,
    transform: transformJestConfig,
  };
}
/* Shared Commands */

export { createTsupFiles };
export { pnpm, pnpmInstall };
export { modifyTSConfig, modifyJestConfig };
