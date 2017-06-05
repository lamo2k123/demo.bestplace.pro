const { resolve } = require('path');

module.exports = (env = {}) => {
    global.webpack = {
        context    : resolve(__dirname, '..'),
        dir        : __dirname,
        env        : process.env.NODE_ENV || (env.production ? 'production' : 'development'),
        development: !env.production,
        production : !!env.production
    };

    const config = {
        context         : global.webpack.context,
        entry           : require('./entry'),
        devtool         : require('./devtool'),
        target          : require('./target'),
        output          : require('./output'),
        module          : {
            rules : require('./module.rules')
        },
        resolve         : require('./resolve'),
        resolveLoader   : require('./resolveLoader'),
        plugins         : require('./plugins/client'),
        performance     : require('./performance'),
        bail            : global.webpack.production,
        profile         : global.webpack.production
    };

    if(global.webpack.development) {
        config.devServer = require(`./devServer`);
    }

    return config;
};
