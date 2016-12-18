const path = require('path')

const examplesFolder = path.resolve(__dirname, 'examples')
const distFolder = path.resolve(__dirname, 'dist')

module.exports = {
  entry: './examples/index.js',
  output: {
    path: distFolder,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }],
  },
}
