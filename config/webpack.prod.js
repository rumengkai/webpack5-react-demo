// webpack.prod.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./paths');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  // 输出
  output: {
    // 区分版本和变动，目的是清缓存
    filename: '[name].[contenthash].bundle.js',

    // bundle 文件路径
    path: resolveApp('dist'),

    // 编译前清除目录
    clean: true
  },
  plugins:[
    // 打包体积分析
    new BundleAnalyzerPlugin()
  ]
})