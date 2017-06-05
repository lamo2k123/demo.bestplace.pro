const { resolve } = require('path');

const common = [
    require('./module.rules.pcss'),
    require('./module.rules.babel'),
    {
        enforce : 'pre',
        test    : /\.jsx?$/,
        exclude : [
            /node_modules/,
            /configs/
        ],
        use: [{
            loader  : 'eslint',
            options : {
                failOnWarning   : global.webpack.production,
                failOnError     : global.webpack.production,
                emitError       : global.webpack.production,
                emitWarning     : global.webpack.production,
                configFile      : resolve(global.webpack.context, '.eslintrc')
            }
        }]
    }
];

const config = {
    development : [
        ...common
    ],
    production  : [
        ...common
    ]
};

module.exports = config[global.webpack.env];
