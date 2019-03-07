const path = require('path')
const webpack = require('webpack')

const distFolder = path.resolve(__dirname, 'dist')

const config = {
  entry: './examples/app.js',
  output: {
    path: distFolder,
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.BUILD_EXAMPLES ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}

module.exports = config
