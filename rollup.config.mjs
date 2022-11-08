import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import polyfills from 'rollup-plugin-polyfill-node'

const common = {
  input: 'src/index.js',
  plugins: [
    // polyfills(),
    json(),
    commonjs({
      dynamicRequireTargets: [
        'node_modules/subsrt/lib/format/*.js'
      ]
    }),
    babel({ babelHelpers: 'runtime' }),
    nodeResolve()
  ]
}

export default [{
  ...common,
  output: {
    file: 'dist/node-bundle.js',
    format: 'cjs'
  }
}, {
  ...common,
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'Crunchyroll'
  }
}, {
  ...common,
  output: {
    file: 'dist/bundle.es.js',
    format: 'es'
  }
}]
