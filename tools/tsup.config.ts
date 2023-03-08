import { defineConfig } from "tsup";

export default defineConfig({
  /* ESM Input & Output */
  entryPoints: ["src/plopfile.ts"],
  publicDir: "src/generators",
  target: "es2022",
  format: ["esm"],
  outDir: "build",

  /* Build Options */
  splitting: true,
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
});
