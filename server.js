const express = require('express');
const path = require('path');
const webpack = require('webpack');
//eslint-disable-next-line
const webpackDev = require('webpack-dev-middleware');
//eslint-disable-next-line
const webpackHot = require('webpack-hot-middleware');
const config = require('./webpack.dev.config');

const app = express();
const compiler = webpack(config);

app.use(webpackDev(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(webpackHot(compiler));

app.use('/static', express.static(path.join(__dirname, '/web/static')));
app.use('/dist', express.static(path.join(__dirname, '/web/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/index.html'));
});

// eslint-disable-next-line
app.listen(80, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server running on port: 80');
});
