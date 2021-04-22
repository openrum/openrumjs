const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/openrum.js',
  output: {
    filename: 'openrum.dev.min.js'
  },
  node: {
    fs: 'empty'
  },
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  plugins: [
    new Dotenv()
  ],
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
  },
  devServer: {
    contentBase: './src/views',
    watchContentBase: true,
    port: 5000,
    open: true
  }
};
