const { resolve } = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const Md5HashPlugin = require('webpack-md5-hash');
const CompressionPlugin = require("compression-webpack-plugin");
const brotliCompress = require('iltorb').compress;

const common = require('./common');

const config = {
    development : [
        ...common
    ],
    production  : [
        ...common,
        new CleanPlugin([
            resolve(global.webpack.context, 'public')
        ], {
            verbose : global.webpack.development,
            dry     : global.webpack.production
        }),
        new Md5HashPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'vendors',
            filename: '[chunkhash].js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            comments: (astNode, comment) => false
        }),
        new CompressionPlugin({
            test     : /\.(js|css|png|ttf)$/,
            algorithm: "gzip",
            minRatio : 0
        }),
        new CompressionPlugin({
            asset    : "[path].br",
            test     : /\.(js|css|png|ttf)$/,
            algorithm: (buffer, options, callback) => {
                brotliCompress(buffer, {
                    mode    : 0,
                    quality : 11,
                    lgwin   : 22,
                    lgblock : 0
                }, callback);
            },
            minRatio : 0
        })
    ]
};

module.exports = config[global.webpack.env];
