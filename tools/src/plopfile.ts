import type { NodePlopAPI } from "plop";

import {
  createFile,
  modifyTSConfig,
  modifyJestConfig,
  install,
} from "./shared";
import { getInput, getOptions } from "./shared";

/* TODO: Custom command to run `fmt` script after process ends  */
/* TODO: Generators for `Remix`, `React` and `Node`*/

function getScriptPackage(plop: NodePlopAPI) {
  plop.setActionType("install", install);

  plop.setGenerator("package:script", {
    description: "Generate a TS Lib with TSup",
    prompts: [
      getInput("name", "What should we name it?"),
      getOptions("kind", "Where should we placed it?", ["apps", "packages"]),
    ],
    actions: (answers) => {
      if (!answers) return [];

      return [
        createFile("tsup.config.ts", "script", answers),
        createFile("tsconfig.json", "script", answers),
        createFile("package.json", "script", answers),
        createFile(".eslintrc", "script", answers),
        createFile("src/index.ts", "script", answers),
        modifyTSConfig("tsconfig.base.json"),
        modifyJestConfig("jest.config.ts"),
        {
          type: "install",
        },
      ];
    },
  });
}

function getReactPacakge(plop: NodePlopAPI) {
  plop.setGenerator("package:react", {
    description: "Generate a React Lib with TSup",
    prompts: [
      getInput("name", "What should we name it?"),
      getOptions("kind", "Where should we placed it?", ["apps", "packages"]),
    ],
    actions: (answers) => {
      if (!answers) return [];

      return [
        createFile("tsup.config.ts", "react", answers),
        createFile("tsconfig.json", "react", answers),
        createFile("package.json", "react", answers),
        createFile(".eslintrc", "react", answers),
        createFile("src/index.ts", "react", answers),
        modifyTSConfig("tsconfig.base.json"),
        modifyJestConfig("jest.config.ts"),
      ];
    },
  });
}

function getRemixPackage(plop: NodePlopAPI) {
  plop.setGenerator("package:remix", {
    description: "Generate a Remix Lib with TSup",
    prompts: [
      getInput("name", "What should we name it?"),
      getOptions("kind", "Where should we placed it?", ["apps", "packages"]),
    ],
    actions: (answers) => {
      if (!answers) return [];

      return [
        createFile("tsup.config.ts", "remix", answers),
        createFile("tsconfig.json", "remix", answers),
        createFile("package.json", "remix", answers),
        createFile(".eslintrc", "remix", answers),
        createFile("src/index.ts", "remix", answers),
        modifyTSConfig("tsconfig.base.json"),
        modifyJestConfig("jest.config.ts"),
      ];
    },
  });
}

export default function (plop: NodePlopAPI) {
  getReactPacakge(plop);
  getRemixPackage(plop);
  getScriptPackage(plop);
}
