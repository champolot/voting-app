const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve('../public'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ]}
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [ new HtmlWebpackPlugin({
    template: './index.html'
  })]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
};

module.exports = config;
