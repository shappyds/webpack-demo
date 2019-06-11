const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const OptimizeCssAssestsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')

const getMPA = () => {
  const entrys = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  entryFiles.map(file => {
    const match = file.match(/src\/(.*)\/index.js$/)
    const pageName = match && match[1]
    entrys[pageName] = match && `./${match[0]}`
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
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

  return { entrys, htmlWebpackPlugins }
}

const { entrys, htmlWebpackPlugins } = getMPA()

module.exports = {
  entry: entrys,
  output: {
    path: path.join(__dirname, 'dist'), // must be absolute path
    filename: '[name]_[chunkhash:8].js'
  },
  // development 会设置process.env.NODE_ENV的值为development,开启NamedChunksPlugin和NamedModulesPlugin
  // productiont 会设置process.env.NODE_ENV的值为production, 开启一系列插件
  // none 不开启任何优化选项
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1一个rem为75px
              remPrecision: 8 // px转换为rem的小数点位数
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new OptimizeCssAssestsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ].concat(htmlWebpackPlugins)
} 