const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const flickrProxy = require('./flickrProxy');

const CWD = process.cwd();
const SRC_DIR = path.join(CWD, 'src');
const ENTRY_FILE = path.join(SRC_DIR, 'index.js');
const DIST_DIR = path.join(CWD, 'dist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: ENTRY_FILE,
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.s?css$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  },

  resolve: {
    extensions: ['*', '.json', '.scss', '.jsx', '.js']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlPlugin({
      template: path.join(SRC_DIR, 'index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css',
      chunkFilename: '[id].[hash:6].css',
      minimize: true
    })
  ],

  devServer: {
    port: 3333,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/groups': flickrProxy(process.env.FLICKR_GROUP_ID)
    }
  }
}
