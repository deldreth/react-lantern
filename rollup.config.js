import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import node from 'rollup-plugin-node-resolve';

import pkg from './package.json';

export default {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'react-lantern',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    node(),
    commonjs({
      ignore: ['react'],
    }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
  external: ['react'],
};
