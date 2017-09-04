import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const pkg = require('./package.json')
// const camelCase = require('lodash.camelcase')

const libraryName = 'InformationFlowLayoutRender'
const libModuleName = 'InformationFlowLayoutRender';

export default {
  entry: `compiled/${libraryName}.js`,
  targets: [
	  { dest: pkg.main, moduleName: libModuleName, format: 'umd' },
	  { dest: pkg.module, format: 'es' }
  ],
  sourceMap: true,
  onwarn: function (warning) {
    // https://github.com/rollup/rollup/issues/794
    // XXX: this 未定义 不报错
    if (warning.code === 'THIS_IS_UNDEFINED') return;
  },
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
    (process.env.NODE_ENV === 'production' && uglify({}, minify)),
  ]
}
