import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

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
    'react-dom',
    '@docusaurus/BrowserOnly'
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
  ]
};
