const errors = require('./Errors');
const BUSINESS_ERROR_MSG = require('./business-error-msgs');
const TECHNICAL_ERROR_MSG = require('./technical-errors-msgs');

module.exports = {
    ...errors,
    BUSINESS_ERROR_MSG,
    TECHNICAL_ERROR_MSG
};