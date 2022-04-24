// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        publicPath: '/interactive-web/dist',
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { 
              source: path.resolve(__dirname, 'dist/index.html'), 
              destination: path.resolve(__dirname, 'index.html')
            },
          ],
        }
      }
    }),
  ],
});
