const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SourceMapDevToolPlugin } = require("webpack");


module.exports = {
    mode:'development',
    entry: [path.resolve(__dirname, 'src')],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundel.js',
        publicPath: '/'
    },
    devServer: {
      contentBase: 'dist',
      historyApiFallback: true,
      clientLogLevel: 'none',
      port: 8080
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
          'node_modules'
        ]
      },

    module:{
        rules:[
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude:/node_modules/,
                use: ['source-map-loader'],
                use:{
                    loader: 'babel-loader'
                }
             },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                  importLoaders: 1,
                  modules: true
                  }
                }
              ],
              include: /\.module\.css$/
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ],
              exclude: /\.module\.css$/
            },
              {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]'
              },

            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './index.html',
                hash: true,
                inject: 'body',
                filename: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new SourceMapDevToolPlugin({
              filename: "[file].map"
            })
        ]
    }