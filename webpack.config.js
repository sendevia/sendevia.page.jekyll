const webpack = require("webpack");
const path = require("path");

const config = {
  mode: "production",
  entry: "./webpack/app.js",
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "bundle.js",
  },
};

module.exports = config;
