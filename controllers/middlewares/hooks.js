const _ = require('lodash');
const Validator = require('ajv');
const ac = require('../../config/auth/acl');

const {
    ValidationError,
    UnauthorizedError,
} = require('../../helpers/errors');
const ACCESS_TYPES = ['createOwn', 'createAny', 'readOwn', 'readAny', 'updateOwn', 'updateAny', 'deleteOwn', 'deleteAny'];

module.exports = (req, res, next) => {
    req.validate = (schema, data, strict = true) => {
        const validator = new Validator();
        const nSchema = schema;

        if (!strict) {
            delete nSchema.required;
        }
        const valid = validator.validate(nSchema, data);

        if (!valid) {
            throw new ValidationError(validator.errors);
        }
    };

    req.authorize = async (user, resource, access, predicate) => {
        try {
            if (_.isNil(user)) {
                throw new UnauthorizedError();
            }

            const { roles } = user;
            let permission;
            let allowed = false;
            let userAccess;
            let nAccess = access;

            if (_.isString(access)) {
                nAccess = [access];
            }

            if (_.intersection(nAccess, ACCESS_TYPES).length !== nAccess.length) {
                throw new ValidationError('authorization hook: invalid access type');
            }

            for (let i = 0; i < nAccess.length; i += 1) {
                permission = ac.can(roles)[nAccess[i]](resource);
                if (permission.granted) {
                    userAccess = nAccess[i];
                    if (!_.isNil(predicate)) {
                        if (userAccess.toLowerCase().endsWith('own')) {
                            const result = await predicate();

                            if (result) {
                                allowed = true;
                                break;
                            }

                            continue;
                        }
                    }

                    allowed = true;
                    break;
                }
            }

            if (permission.granted === true && allowed === true) {
                const { attributes } = permission;

                if (attributes.length === 0 || (attributes.length === 0 && attributes[0] === '*')) {
                    return;
                }

                if (!_.isNil(req.body)) {
                    req.body = permission.filter(req.body);
                }
            } else {
                throw new UnauthorizedError();
            }
        } catch (err) {
            throw err;
        }
    };

    next();
};
