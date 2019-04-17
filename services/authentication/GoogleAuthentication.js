const _ = require('lodash');
const AuthenticationService = require('./AuthenticationService');

class GoogleAuthentication extends AuthenticationService{
    static async login(googleUser) {
        try {
            let existingUser = await this.UserModel.findOne({email: googleUser.email});
            let newUser;
            if(_.isNil(existingUser)) {
                newUser = generateGoogleUser(googleUser);
                newUser = await this.UserModel.create(newUser);
            }
            const user = existingUser ? existingUser : newUser.ops[0];
            return await this.refreshToken(existingUser, user);
        } catch (e) {
            throw e;
        }
    }
}
function generateGoogleUser(googleUser) {
    return {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        roles: [GoogleAuthentication.USERS.ROLES.USER],
        provider: GoogleAuthentication.USERS.PROVIDERS.GOOGLE,
        isVerified: true,
    };
}

module.exports = GoogleAuthentication;