const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    hot: 'webpack/hot/dev-server.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: false,
    client: false,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './public/index.html',
    }),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        { from: "public/img", to: "img" },
        { from: "public/manifest.json", to: "." },
        { from: "public/favicon.ico", to: "." }
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          sourceMaps: false,
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { "runtime": "automatic" }]
          ],
          plugins: [
            ['@babel/plugin-transform-runtime']
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};