const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './dist/openrum.js',
  output: {
    filename: 'openrum.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'dist')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './src/views',
    watchContentBase: true,
    port: 5000,
    open: true
  }
};
