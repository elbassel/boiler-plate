const bodyParser = require('body-parser');
const compress = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const devLogger = require('morgan');


const utils = require('../helpers/utils');
const { NotFoundError, BaseError } = require('../helpers/errors/Errors');

// Custom middlewares
const { 
    hooks,
    logger,
    queryStringMutation,
    authentication
 } = require('../controllers/middlewares/');
const passport = require('../config/auth/passport');
const config= require('../config/');
const routes = require('./routes');

const middlewares = [];
if (utils.inDevelopment()) {
    middlewares.push(devLogger('dev'));
}

middlewares.push(
    // Express
    cors(),
    authentication,
    bodyParser.json({ limit: '1mb' }),
    bodyParser.urlencoded({ extended: true }),
    mongoSanitize({ replaceWith: '_' }),
    compress(),
    // Custom Middlewares
    hooks,
    logger,
    queryStringMutation,
    require('express-session')(config.expressSession),
    passport.initialize(),
    passport.session(),
    // Routes
    ...routes,
    // Error Handlers
    (req, res, next) => {
        const err = new NotFoundError();
        next(err);
    },
    (err, req, res, next) => {
        const errorMsg = err instanceof BaseError? err.toJson() : {} ;
        const payload = {
            code: errorMsg.code || 0,
            name: errorMsg.name,
            message: errorMsg.message || 'Error',
            errors: errorMsg.errors,
        };
        // Set res code based on error code or return 500
        res.statusCode = err.status || 500;
        // // ajv errors
        // if (err.status && err.status === 400) {
        //     // Handle ajv errors
        //     if (Array.isArray(err.errors)) {
        //         payload.details = err.errors;
        //         payload.message = 'validation error(s)';
        //     }
        // }

        res.locals.reqLog.level = 'error';
        res.locals.reqLog.stack = err.stack;

        if (utils.inDevelopment()) {
            payload.stack = JSON.stringify(err.stack);
            return res.json(payload);
        }

        res.json(payload);
    }
);

module.exports = middlewares;
