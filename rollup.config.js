import external from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled'
      }),
      resolve(),
      commonjs(),
      terser()
    ]
  }
];
