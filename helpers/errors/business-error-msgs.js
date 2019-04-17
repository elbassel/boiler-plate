const HTTP_CODES = require('../http-codes');

module.exports = {
    API: {
        NOT_FOUND: {
            NAME: 'NOT_FOUND',
            CODE: 4,
            STATUS: HTTP_CODES.NOT_FOUND,
            MSG: 'Not found',
        },
    },
    DEFAULT_VALIDATION_ERROR: {
        NAME: 'VALIDATION_ERROR',
        CODE: 9,
        MSG: 'Validation errors',
        STATUS: HTTP_CODES.BAD_REQUEST
    },
    USERS: {
        DUPLICATE_USER: {
            NAME: 'DUPLICATE_USER_ERROR',
            CODE: 5,
            STATUS: HTTP_CODES.DUPLICATE_ENTITY,
            MSG: 'User with this data already exist'
        },
        USER_NOT_FOUND: {
            NAME: 'USER_NOT_FOUND',
            CODE: 6,
            STATUS: HTTP_CODES.NOT_FOUND,
            MSG: 'User not found',
        }
    },
    BRANDS: {
        DUBLICATE_BRAND: {
            NAME: 'DUPLICATE_BRAND_ERROR',
            CODE: 5,
            STATUS: HTTP_CODES.DUPLICATE_ENTITY,
            MSG: 'Brand with the same name already exists'
        }
    },
    CATEGORY: {
        DUPLICATE_CATEGORY: {
            NAME: 'DUPLICATE_BRAND_ERROR',
            CODE: 5,
            STATUS: HTTP_CODES.DUPLICATE_ENTITY,
            MSG: 'Category with same name does exist',
        },
        PARENT_NOT_FOUND: {
            NAME: 'PARENT_NOT_FOUND_ERROR',
            CODE: 5,
            STATUS: HTTP_CODES.NOT_FOUND,
            MSG: 'Parent category not found',
        },
    },
    AUTHENTICATION_FAIL: {
        NAME: 'AUTHENTICATION_FAIL',
        CODE: 6,
        MSG: 'Username or password is wrong',
        STATUS: HTTP_CODES.FORBIDDEN_ACCESS,
    },
    AUTHORIZATION_ERROR: {
        NAME: 'AUTHORIZATION_ERROR',
        CODE: 6,
        MSG: 'You are not authorized to access this resource',
        STATUS: HTTP_CODES.FORBIDDEN_ACCESS,
    },
    JWT_TOKEN_FAIL: {
        NAME: 'TOKEN_FAILED',
        CODE: 7,
        MSG: 'You are not authenticated, please use another jwt token, try to logout and login',
        STATUS: HTTP_CODES.FORBIDDEN_ACCESS,
    },
    INVALID_FILE_EXTENSION: {
        NAME: 'INVALID_FILE_EXTENSION',
        CODE: 7,
        MSG: 'Invalid file extension',
        STATUS: HTTP_CODES.BAD_REQUEST,
    },
    UNEXPECTED_FIELD_NAME: count => {
        return {
            NAME: 'UNEXPECTED_FIELD_NAME',
            CODE: 7,
            MSG: `Invalid Invalid field name or count must be less than or equal ${count} files`,
            STATUS: HTTP_CODES.BAD_REQUEST,
        };
    },
    LIMIT_FILE_SIZE: size => {
        return {
            NAME: 'LIMIT_FILE_SIZE',
            CODE: 7,
            MSG: `Files size should be less than ${size} bytes`,
            STATUS: HTTP_CODES.BAD_REQUEST,
        };
    },
    LIMIT_UNEXPECTED_FILE: {
        NAME: 'LIMIT_UNEXPECTED_FILE',
        CODE: 7,
        MSG: 'Field is not matched with the backend',
        STATUS: HTTP_CODES.BAD_REQUEST,
    },
};
