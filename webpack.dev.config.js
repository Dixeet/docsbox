const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?quiet=true',
    './web/index.jsx',
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
      { test: /\.jsx$/, loader: 'babel-loader', include: path.join(__dirname, 'web') },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'web/Components'),
      Stores: path.resolve(__dirname, 'web/Stores'),
      Base: path.resolve(__dirname, 'web'),
      Containers: path.resolve(__dirname, 'web/Containers'),
    },
  },
};
