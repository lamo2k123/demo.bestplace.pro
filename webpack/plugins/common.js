const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    new webpack.DefinePlugin({
        __PRODUCTION__          : global.webpack.production,
        __DEVELOPMENT__         : global.webpack.development,
        'process.env.NODE_ENV'  : JSON.stringify(global.webpack.env)
    }),
    new ExtractTextPlugin({
        filename : '[contenthash].css',
        allChunks   : global.webpack.client,
        disable     : global.webpack.development
    })
];
