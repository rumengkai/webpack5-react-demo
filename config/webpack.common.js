// webpack.common.js

const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const path = require("path");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir);
};
const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === "development",
  isEnvProduction: process.env.NODE_ENV === "production",
};

const { isEnvDevelopment, isEnvProduction } = ctx;

// 样式的数组的
const cssLoaderAry = [
  "css-hot-loader",
  isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
  // "css-loader",
  {
    loader: "css-loader",
    options: {
      modules: false,
    },
  },
  "postcss-loader",
];
module.exports = {
  // 入口
  entry: {
    index: "./src/index",
  },
  output: {
    path: resolve("dist"), // string
    pathinfo: false,
    publicPath: "/", // root Dir
    sourceMapFilename: "[name].map",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    filename: "static/js/[name].[contenthash:8].js",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": paths.appSrc, // @ 代表 src 路径
    },
    modules: ["node_modules", paths.appSrc],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [paths.resolveApp("src")],
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: cssLoaderAry,
      },
      {
        test: /\.less$/i,
        use: [
          ...cssLoaderAry,
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                exclude: /node_modules/,
                // modifyVars: theme, // 自定义主题的
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: paths.appSrc,
        use: [
          ...cssLoaderAry,
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
          // 将 Sass 编译成 CSS
          "sass-loader",
        ].filter(Boolean),
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: "webpack",
      template: "/public/index.html",
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  resolve: {
    extensions: [".jsx", ".js", ".css", ".tsx"],
  },
};
