// webpack.dev.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./paths');
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  // 输出
  output: {
    // bundle 文件名称
    filename: '[name].bundle.js',

    // bundle 文件路径
    path: resolveApp('dist'),

    // 编译前清除目录
    clean: true
  },
  devServer: {
    // 告诉服务器位置。
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8888,
    hot: true,
  },
  devtool: 'eval-cheap-module-source-map',
})