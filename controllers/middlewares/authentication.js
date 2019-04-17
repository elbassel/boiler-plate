const _ = require('lodash');
const SecurityUtils = require('../../helpers/crypto');
const { User } = require('../../database/models');
const { UsersUtils } = require('../../services/users');
const { BUSINESS_ERROR_MSG, UnauthenticatedError }  = require('../../helpers/errors');
module.exports = (req, res, next) => {
    try {
        if (_.isNil(req.headers.authorization)) {
            req.user = genereateGuestUserObj();
            return next();
        }
        const { authorization } = req.headers;
        SecurityUtils.verifyToken(authorization).then(async (decoded)=>{
            try {
                let user = decoded;
                if (UsersUtils.isUserAnEmployee(user)) {
                    user = await User.findById(user._id);
                }
                req.user = user;
                next();
            } catch (error) {
                next(error);
            }
        },(err)=>{
            next(new UnauthenticatedError());
        });
    } catch (e) {
        next(e);
    }
};

function genereateGuestUserObj() {
    return  { _id: '0', roles: ['guest'] };
}

