import type { NodePlopAPI } from "plop";

import { prompts } from "./prompts";
import { createTsupFiles } from "./commands";
import { fmt, fmtWrite } from "./commands";
import { pnpm, pnpmInstall } from "./commands";
import { prettier, prettierWrite } from "./commands";
import { modifyJestConfig, modifyTSConfig } from "./commands";

function getScriptGenerator(plop: NodePlopAPI) {
  plop.setActionType("prettier", prettier);
  plop.setActionType("pnpm", pnpm);
  plop.setActionType("fmt", fmt);

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
        fmtWrite(),
        prettierWrite(),
      ];
    },
  });
}

export default function (plop: NodePlopAPI) {
  getScriptGenerator(plop);
}
