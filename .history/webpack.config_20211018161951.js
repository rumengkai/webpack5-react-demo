const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
    alias: {
      '@': './',
    },
    symlinks: false,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        vendors: { 
          //node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: 'vendors', //chunks name
          priority: 10, //优先级
          enforce: true
        }
      }
    },
  },
}