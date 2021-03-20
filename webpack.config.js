const path = require('path')
const webpack = require('webpack')

const node = {
  entry: './src/index.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'node-bundle.js'
  }
}

const browser = {
  entry: './src/index.js',
  mode: 'production',
  // devtool: 'inline-source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'Crunchyroll',
    globalObject: 'window'
  }
}

module.exports = [node, browser]
