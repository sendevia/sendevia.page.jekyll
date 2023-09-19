const path = require("path");

module.exports = {
  mode: "development",
  entry: "./webpack/entry.js",
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "bundle.js",
  },
  devtool: "source-map",
};
