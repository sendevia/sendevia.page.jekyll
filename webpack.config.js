const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./webpack/entry.js",
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
