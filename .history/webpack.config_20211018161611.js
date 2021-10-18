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
}