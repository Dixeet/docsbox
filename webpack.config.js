const path = require('path');

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    './web/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'web'),
    publicPath: '/static/js',
    filename: 'index.js',
  },
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
