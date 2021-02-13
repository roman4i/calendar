const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template/template.html'),
      filename: 'index.html',
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: './app.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {

            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
