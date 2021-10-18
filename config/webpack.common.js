// webpack.common.js

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // 入口
  entry: {
    index: './src/index.js',
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'webpack',
    }),
  ],
}