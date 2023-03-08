import path from "path";

type Answers = Record<string, any>;

const ESCAPE_COMMENTS = /\/\*[\s\S]*?\*\//g;

function transformTSConfig(content: string, { name, kind }: Answers) {
  const tsconfig = JSON.parse(content.replace(ESCAPE_COMMENTS, ""));
  const repo = path.basename(process.cwd());

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

  const repo = path.basename(process.cwd());

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

export { transformTSConfig, transformJestConfig };
