const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?quiet=true',
    './web/index.js',
  ],
  output: {
    path: path.join(__dirname, 'web'),
    publicPath: '/static/js',
    filename: 'index.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: path.join(__dirname, 'web') },
    ],
  },
};
