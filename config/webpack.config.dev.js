const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "../public"),
    watchContentBase: true,
    historyApiFallback: true,
    stats: "errors-only",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
