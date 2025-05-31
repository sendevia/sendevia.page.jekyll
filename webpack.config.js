const path = require("path");

module.exports = (argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./webpack/app.js",
    output: {
      path: path.resolve(__dirname, "assets/js"),
      filename: "bundle.js",
      clean: true,
    },
    plugins: [],
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
  };
};
