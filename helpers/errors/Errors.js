const BUSINESS_ERROR = require('../errors/business-error-msgs');
const TECHNICAL_ERROR = require('../errors/technical-errors-msgs');

/**
 * id: Number (Error unique id)
 * name: String (Error name)
 * status: Number (http response status)
 * message: String (Error message)
 */
class BaseError extends Error {
    constructor(
        name = 'UnexpectedError',
        message = 'Internal server error',
        status = 500,
        code = 400,  // Code of the message that frontend will use it to display the message
        stack = 500  // Http status code
    ) {
        super(message);

        this.code = code;
        this.name = name;
        this.status = status;
        this.message = message;
        this.stack = stack;
    }

    toJson() {
        return {
            error: this.name,
            message: this.message,
            code: this.code
        };
    }
}

class NotFoundError extends BaseError {
    constructor(typeError = BUSINESS_ERROR.API.NOT_FOUND) {
        super(typeError.NAME, typeError.MSG, typeError.STATUS, typeError.CODE);
    }
}

class UnauthenticatedError extends BaseError {
    constructor(typeError = BUSINESS_ERROR.AUTHENTICATION_FAIL, err) {
        super(typeError.NAME, typeError.MSG, typeError.STATUS, typeError.CODE, err);
    }
}

class UnauthorizedError extends BaseError {
    constructor(typeError = BUSINESS_ERROR.AUTHORIZATION_ERROR, err) {
        super(typeError.NAME, typeError.MSG, typeError.STATUS, typeError.CODE, err);
    }
}

class ValidationError extends BaseError {
    constructor(errors, typeError = BUSINESS_ERROR.DEFAULT_VALIDATION_ERROR) {
        super(typeError.NAME, typeError.MSG, typeError.STATUS, typeError.CODE);
        this.errors = errors;
    }
    toJson() {
        return {
            error: this.name,
            message: this.message,
            code: this.code,
            errors: this.errors
        };
    }
}

class BusinessValidationError extends BaseError {
    constructor(typeError = BUSINESS_ERROR.DEFAULT_VALIDATION_ERROR) {
        super(typeError.NAME, typeError.MSG, typeError.STATUS, typeError.CODE);
    }
}

class UnexpectedError extends BaseError {
    constructor(typeError = BUSINESS_ERROR.DEFAULT_UNEXPECTED_ERROR) {
        const ERROR_NAME = TECHNICAL_ERROR.DEFAULT_UNEXPECTED_ERROR.NAME;
        const STATUS = TECHNICAL_ERROR.DEFAULT_UNEXPECTED_ERROR.STATUS;
        super(ERROR_NAME, null,  typeError, STATUS);
    }
}

module.exports = {
    BaseError,
    UnauthenticatedError,
    UnauthorizedError,
    ValidationError,
    BusinessValidationError,
    NotFoundError,
    UnexpectedError
};

