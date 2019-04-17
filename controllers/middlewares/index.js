const hooks = require('./hooks');
const logger = require('./logger');
const queryStringMutation = require('./queryStringMutation');
const authentication = require('./authentication');
const upload = require('./upload');
const multipartParser = require('./multipartParser');

// const hooks = require('./hooks');

module.exports = {
    hooks,
    logger,
    queryStringMutation,
    authentication,
    upload,
    multipartParser
};
