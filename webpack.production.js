const { merge } = require('webpack-merge');

const commonWebpack = require('./webpack.common');

const output = merge(commonWebpack);

module.exports = output;
