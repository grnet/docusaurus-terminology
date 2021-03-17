import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default {
  input: './index.js',
  output: [
    {
      file: './dist/index.js',
      format: 'esm'
    },
  ],
  external: [
    'react',
    'react-dom'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
  ]
};
