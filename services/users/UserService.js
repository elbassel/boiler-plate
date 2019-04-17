const { User } = require('../../database/models');
const { BusinessValidationError, BUSINESS_ERROR_MSG  } = require('../../helpers/errors/');
const { USERS } = require('../../helpers/constants');
const BaseService =  require('../BaseService');

class UserService extends BaseService {
    constructor() {
        super(User);
    }

    async create(user){
        try {
            user.provider = USERS.PROVIDERS.LOCAL;
            const uniqueQuery = {email: user.email};
            // user.roles = [USERS.ROLES.USER];
            const newUser = await this.createUniqueDocument(user, uniqueQuery, BUSINESS_ERROR_MSG.USERS.DUPLICATE_USER);

            return {
                jwt: newUser.jwt,
                _id: newUser._id,
                email: newUser.email,
                lastName: newUser.lastName,
                firstName: newUser.firstName,
                roles: newUser.roles
            };
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UserService();
