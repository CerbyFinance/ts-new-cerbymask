const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "../src"),
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: [/\.(ts|js)x?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        use: ["url-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public", "index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, "../src/types/"),
      "@views": path.resolve(__dirname, "../src/views/"),
      "@globalStyle": path.resolve(__dirname, "../src/globalStyle/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@chains": path.resolve(__dirname, "../src/chains/"),
      "@assets": path.resolve(__dirname, "../src/assets/"),
      "@utils": path.resolve(__dirname, "../src/utils/"),
      "@router": path.resolve(__dirname, "../src/router/"),
      "@store": path.resolve(__dirname, "../src/store/"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      fs: require.resolve("browserify-fs"),
      process: require.resolve("process/browser"),
    },
  },
};
