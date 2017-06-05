const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browsers = [
    'Chrome >= 58'
];

const use = [{
    loader : 'style'
}, {
    loader : 'css',
    options: {
        context       : global.webpack.context,
        modules       : true,
        sourceMap     : global.webpack.development,
        minimize      : global.webpack.production,
        localIdentName: global.webpack.production ? '[hash:hex]' : '[local]'
    }
}, {
    loader : 'postcss',
    options: {
        plugins: [
            require('doiuse')({
                browsers,
                ignore: [
                    'flexbox',
                    'viewport-units',
                    'css-appearance',
                    'will-change',
                    'pointer-events',
                    'font-unicode-range',
                    'outline',
                    'css-media-resolution'
                ]
            }),
            require('stylehacks')({
                browsers,
                lint     : true,
                sourcemap: true
            }),
            require('stylelint')({
                configBasedir: global.webpack.context
            }),
            require('postcss-nested'),
            require('autoprefixer')({ browsers })
        ]
    }
}];

if(global.webpack.production) {
    delete use.shift();
}

module.exports = {
    test    : /\.pcss$/,
    use     : ExtractTextPlugin.extract({ use }),
    include : [
        resolve(global.webpack.context, 'app')
    ]
};
