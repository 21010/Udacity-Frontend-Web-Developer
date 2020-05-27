const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'client',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'media',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            minify: {
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}