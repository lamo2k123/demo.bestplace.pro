const { resolve } = require('path');
const config = require('./../configs/config');

const result = {
    development : {
        path            : resolve(global.webpack.context, 'public'),
        publicPath      : `http://${config['server.host']}:${config['dev-server.port']}/`,
        pathinfo        : true,
        chunkFilename   : '[name].js',
        filename        : '[name].js'
    },
    production  : {
        path            : resolve(global.webpack.context, 'public'),
        chunkFilename   : '[chunkhash].js',
        filename        : '[chunkhash].js',
        publicPath      : '/'
    }
};

module.exports = result[global.webpack.env];
