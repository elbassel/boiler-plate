const _ = require('lodash');
const AuthenticationService = require('./AuthenticationService');

class FacebookAuthentication extends AuthenticationService{
    static async login(facebookUser) {
        try {
            let existingUser = await this.UserModel.findOne({email: facebookUser.email});
            let newUser;
            if(_.isNil(existingUser)) {
                newUser = generateFacebookUser(facebookUser);
                newUser = await this.UserModel.create(newUser);
            }
            const user = existingUser ? existingUser: newUser.ops[0];

            return await this.refreshToken(existingUser, user);
        } catch (e) {
            throw e;
        }
    }
}
function generateFacebookUser(facebookUser) {
    return {
        email: facebookUser.email,
        firstName: facebookUser.first_name,
        lastName: facebookUser.last_name,
        roles: [FacebookAuthentication.USERS.ROLES.USER],
        provider: FacebookAuthentication.USERS.PROVIDERS.FACEBOOK,
        isVerified: true,
    };
}

module.exports = FacebookAuthentication;