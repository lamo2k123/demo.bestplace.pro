let config = {};

if(process.env.NODE_ENV) {
    try {
        config = require('./' + process.env.NODE_ENV + '.json');
    } catch(e) {
        console.error(`Do you have ${process.env.NODE_ENV} config?`, e);
    }
} else {
    console.error('Supply correct NODE_ENV env variable');
}

module.exports = config;
