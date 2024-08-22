const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: glob.sync(path.resolve(__dirname, './build/**/*.js')),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  externals: {
    window: 'window', // Tell Webpack to treat window as a global variable
  },
  plugins: [
    new webpack.ProvidePlugin({
      window: 'window',
    }),
  ]
};