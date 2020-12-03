const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: (env === 'development') ? 'inline-source-map' : false,
  mode: env,
  devServer: {
    contentBase: './dist',
    open: true,
    port: 5000,
    hot: true,
  },
  plugins: [new CopyPlugin({
    patterns: [
      { from: "demo" }
    ]
  })]
};
