import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

import babel from 'rollup-plugin-babel'

import { terser } from 'rollup-plugin-terser'


export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/KivaProxy.js',
      name: 'KivaProxy',
      format: 'umd',
    },
    {
      file: 'dist/KivaProxy.min.js',
      format: 'umd',
      name: 'KivaProxy',
      plugins: [
        terser()
      ]
    }
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    commonjs(),
    resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    babel({
      exclude: 'node_modules/**',
    }),
    json(),
  ]
}
