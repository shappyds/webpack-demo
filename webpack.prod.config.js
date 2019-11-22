'use strict'

const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: [ MiniCSSExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
  ],
}