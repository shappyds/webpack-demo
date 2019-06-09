const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
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
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
} 