import path from "path";

import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');
const name = pkg.name;

const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author}
* @license MIT
*/
`;

const input = path.join(__dirname, "src/index.ts");

const bundles = [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      banner
    },
  },
  {
    input,
    output: {
      file: path.join(__dirname, "dist/use-floating.esm.min.js"),
      format: "esm",
      banner
    },
  },
  {
    input,
    output: {
      banner,
      name:'UseFloating',
      file: path.join(__dirname, "dist/use-floating.global.js"),
      format: "umd",
      globals: {
        vue: "Vue",
        "@floating-ui/dom": "FloatingUIDOM",
      },
    },
  },
  {
    input,
    output: {
      name: "UseFloating",
      banner,
      file: path.join(__dirname, "dist/use-floating.global.min.js"),
      format: "umd",
      globals: {
        vue: "Vue",
        "@floating-ui/dom": "FloatingUIDOM",
      },
    },
  },
  {
    input,
    output: {
      banner,
      file: pkg.main,
      format: "cjs",
    },
  },
];

const buildExport = bundles.map(({ input, output }) => ({
  input,
  output,
  external: ["vue", "@floating-ui/dom"],
  plugins: [
    ts({
      check: false,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: output.sourcemap,
          declaration: true,
          declarationMap: true,
        },
        exclude: ['__tests__', 'test-dts'],
      },
    }),
    resolve(),
    commonjs(),
   
    replace({
      __DEV__: output.file.includes(".min.")
        ? "false"
        : 'process.env.NODE_ENV !== "production"',
      preventAssignment: true,
    }),
    output.file.includes(".min.") && terser(),
  ],
}));

export default buildExport ;
