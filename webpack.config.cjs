const webpack = require('webpack');

const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

//const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});


module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watch: true,
  module: {
    rules: [
        {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
        },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin(envKeys) // ← This exposes your env vars
  ],
}