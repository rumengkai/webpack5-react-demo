// webpack.common.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  isEnvProduction: process.env.NODE_ENV === 'production',
}

const { isEnvDevelopment, isEnvProduction } = ctx


module.exports = {
  // 入口
  entry: {
    index: './src/index',
  },
  output: {
    pathinfo: false,
    filename: ctx.isEnvProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': paths.appSrc, // @ 代表 src 路径
    },
    modules: [
      'node_modules',
      paths.appSrc,
    ],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [
          paths.resolveApp('src'),
        ],
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        include: paths.appSrc,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          isEnvProduction && MiniCssExtractPlugin.loader, // 仅生产环境
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          // 将 PostCSS 编译成 CSS
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          {
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2
            }
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ].filter(Boolean),
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: paths.appSrc + '/index.html'
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new MiniCssExtractPlugin()
  ],
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}