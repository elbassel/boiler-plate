const Model = require('../types/Model');
const { users: user } = require('../../helpers/validation/');
const { USERS } = require('../../helpers/constants/');
const crypto = require('../../helpers/crypto');
const userSchema = require('../schema/user');
class User extends Model {
    constructor(){
        super('users', userSchema,
            {
                validation: {
                    create: user.create,
                    update: user.create
                },
                timestamp: true,
                indexes: [ { fields: {email: 1}}]
            });
    }

    async preSave(user) {
        super.preSave(user);

        if(user.password) {
            const hashedPassword = await crypto.createHash(user.password);
            user.password = hashedPassword;
        }

        // user.roles = [USERS.ROLES.USER];
    }
}

module.exports = new User();
