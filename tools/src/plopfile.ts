import type { NodePlopAPI } from "plop";

import { prompts } from "./prompts";
import { createTsupFiles } from "./commands";
import { pnpm, pnpmInstall } from "./commands";
import { modifyJestConfig, modifyTSConfig } from "./commands";

function getScriptGenerator(plop: NodePlopAPI) {
  plop.setActionType("pnpm", pnpm);

  plop.setGenerator("package:script", {
    description: "Generate a TS Lib with TSup",
    prompts: [...prompts],
    actions: (answers) => {
      if (!answers) return [];

      return [
        ...createTsupFiles("script", answers),
        modifyJestConfig(),
        modifyTSConfig(),
        pnpmInstall(),
      ];
    },
  });
}

function getReactGenerator(plop: NodePlopAPI) {
  plop.setActionType("pnpm", pnpm);

  plop.setGenerator("package:react", {
    description: "Generate a React Lib with TSup",
    prompts: [...prompts],
    actions: (answers) => {
      if (!answers) return [];

      return [
        ...createTsupFiles("react", answers),
        modifyJestConfig(),
        modifyTSConfig(),
        pnpmInstall(),
      ];
    },
  });
}

function getRemixGenerator(plop: NodePlopAPI) {
  plop.setActionType("pnpm", pnpm);

  plop.setGenerator("package:remix", {
    description: "Generate a Remix Lib with TSup",
    prompts: [...prompts],
    actions: (answers) => {
      if (!answers) return [];

      return [
        ...createTsupFiles("remix", answers),
        modifyJestConfig(),
        modifyTSConfig(),
        pnpmInstall(),
      ];
    },
  });
}

export default function (plop: NodePlopAPI) {
  getScriptGenerator(plop);
  getReactGenerator(plop);
  getRemixGenerator(plop);
}
