const path = require("path")

module.exports = {
  entry: "./src/index.js",
  watch: true,
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
