'use strict'

const glob = require('glob')
const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugin = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  
  Object.keys(entryFiles)
    .map(index => {
      const entryFile = entryFiles[index]
      const match = entryFile.match(/src\/(.*)\/index.js/)
      const pageName = match && match[1]
      
      entry[pageName] = entryFile
      htmlWebpackPlugin.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          inject: true,
          chunks: [pageName],
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        }),
      )
    })

  return {
    entry,
    htmlWebpackPlugin
  }
}

const { entry, htmlWebpackPlugin } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: [ MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin()
  ].concat(htmlWebpackPlugin),
}