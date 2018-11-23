const path = require('path');

module.exports = {
  entry: {
    "fpxkcd": path.join(__dirname, 'src', 'index.js'),
  },

  resolve: {
    extensions: ['.js'],
  },

  target: 'web',

  context: __dirname,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
    ],
  },
};
