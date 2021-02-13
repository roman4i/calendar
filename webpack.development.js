const path = require('path');
const { merge } = require('webpack-merge');

const commonWebpack = require('./webpack.common');

const config = merge(commonWebpack, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});

module.exports = config;
