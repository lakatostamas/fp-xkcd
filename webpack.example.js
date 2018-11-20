/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(dev, {
  output: {
    path: path.resolve(__dirname, 'example'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>FlashCards</title>
        </head>
        <body>
        </body>
        </html>
      `,
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'example'),
  },
});
