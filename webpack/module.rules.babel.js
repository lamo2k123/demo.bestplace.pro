const { resolve } = require('path');

module.exports =  {
    test    : [
        /^[\w./-]+(?:app|configs)[\w./-]+\.jsx?$/
    ],
    include : [
        resolve(global.webpack.context, 'app'),
        resolve(global.webpack.context, 'configs')
    ],
    use: [{
        loader  : 'babel',
        options : {
            forceEnv      : `${global.webpack.env}`,
            cacheDirectory: global.webpack.development
        }
    }]
};
