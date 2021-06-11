const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV || "production";

module.exports = {
  entry: {
    widget: "./src/widget.js",
    main: "./src/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: env === "development" ? "inline-source-map" : false,
  mode: env,
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 5000,
    hot: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "demo" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
