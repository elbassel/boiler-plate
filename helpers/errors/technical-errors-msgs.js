const HTTP_CODES = require('../http-codes');

module.exports = {
    MODEL_NOT_REGISTERED: {
        NAME: 'MODEL_NOT_REGISTERED',
        CODE: 4,
        STATUS: HTTP_CODES.SERVER_ERROR,
        MSG: 'Model not registered',
    },
    MODEL_VALIDATION: {
        NAME: 'MODEL_VALIDATION',
        CODE: 4,
        STATUS: HTTP_CODES.SERVER_ERROR,
        MSG: 'Model validation error',
    },
    DEFAULT_UNEXPECTED_ERROR: {
        NAME: 'DEFAULT_UNEXPECTED_ERROR',
        CODE: 10,
        MSG: 'Uexpected error',
        STATUS: HTTP_CODES.SERVER_ERROR
    },
}