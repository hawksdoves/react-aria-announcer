var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/app/index.js',
  output: {
    path: path.resolve(__dirname, 'example/build'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ '@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  mode: process.env.ENV
};