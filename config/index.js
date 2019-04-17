const development = require('./config.dev');
const test = require('./config.test');
const production = require('./config.prod');
const env = process.env.NODE_ENV || 'development';

const configurations = {
    development,
    production,
    test
};

module.exports = configurations[env];
