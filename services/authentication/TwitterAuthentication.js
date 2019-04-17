const _ = require('lodash');
const AuthenticationService = require('./AuthenticationService');

class TwitterAuthentication extends AuthenticationService{
    static async login(twitterUser) {
        try {
            let existingUser = await this.UserModel.findOne({email: twitterUser.email});
            let newUser;
            if(_.isNil(existingUser)) {
                newUser = generateTwitterUser(twitterUser);
                newUser = await this.UserModel.create(newUser);
            }
            const user = existingUser ? existingUser : newUser.ops[0];
            return await this.refreshToken(user);
        } catch (e) {
            throw e;
        }
    }
}
function generateTwitterUser(twitterUser) {
    return {
        email: twitterUser.email,
        firstName: twitterUser.name,
        roles: [TwitterAuthentication.USERS.ROLES.USER],
        provider: TwitterAuthentication.USERS.PROVIDERS.TWITTER,
        isVerified: true,
    };
}

module.exports = TwitterAuthentication;