import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json"); // to be able to refer to properties

// ----- rollup config exports an array of configuration objects

export default [
  {
    input: "src/index.ts", // the entrypoint for the library
    output: [
      {
        file: packageJson.main, // where it gets exported
        format: "cjs", // common JS
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm", // ES6 modules
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }), // specify where to find tsconfig
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }], // entire lib in dist dir
    plugins: [dts()],
  },
];
