const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DEV_MODE = require('./config').DEV_MODE;
const Webpack = require('webpack');

module.exports = {
    entry: './src/js',
    output: {
        filename: 'js/bundle.js',
        path: __dirname + '/build'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            sourceMap: DEV_MODE
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: 'inline'
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: DEV_MODE
                        }
                    }],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader?name=images/[name]_[hash:6].[ext]'
                }, {
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }]
            }]
    },
    plugins: [
        new ExtractTextPlugin('css/stylesheet.css'),
    ]
};