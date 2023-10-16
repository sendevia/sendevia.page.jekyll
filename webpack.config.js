const path = require("path");

module.exports = {
  mode: "development",
  entry: "./webpack/app.js",
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "bundle.js",
  },
  devtool: "source-map",
};
