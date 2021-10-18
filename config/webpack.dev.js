// webpack.dev.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common')
import { resolveApp } from '../paths'

module.exports = merge(common, {
  // 输出
  output: {
    // bundle 文件名称
    filename: '[name].bundle.js',

    // bundle 文件路径
    path: resolveApp('dist'),

    // 编译前清除目录
    clean: true
  },
})