// webpack.prod.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./paths');
const glob = require('glob')
// 打包体积分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 压缩js代码
const TerserPlugin = require('terser-webpack-plugin');
// 压缩css代码
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const paths = require('./paths');

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
  plugins: [
    // 打包体积分析
    new BundleAnalyzerPlugin(),
    // 抽离
    new MiniCssExtractPlugin({
      filename: "[hash].[name].css",
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*`,  { nodir: true }),
    }),
  ],
  optimization: {
    runtimeChunk: true,
    moduleIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups:{
        vendors:{ // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true 
        }
      }
    },
  },
})