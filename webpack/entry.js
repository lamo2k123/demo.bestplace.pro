const common = {
    client: ['babel-polyfill', './app']
};

const config = {
    development: common.client,
    production : {
        main   : common.client,
        vendors: [
            'react',
            'react-dom',
            'history',
            'hook-redux',
            'react-redux',
            'redux-saga',
            'redux',
            'react-router-async',
            'core-js'
        ]
    }
};

module.exports = config[global.webpack.env];
