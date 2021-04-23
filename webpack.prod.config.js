const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './dist/openrum.js',
  output: {
    filename: 'openrum.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};
