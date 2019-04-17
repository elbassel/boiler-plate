const UserModel = require('../../database/models/User');
const crypto = require('../../helpers/crypto');
const JWTUserService = require('../users/JWTUserService');
const { USERS } = require('../../helpers/constants');
const config = require('../../config');
const { MailEmailNotification } = require('../mails');

class AuthenticationService {
    login() {
        throw Error('You have to implement this function');
    }
    static generateUserResponse(user) {
        return {
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            roles: user.roles,
            jwt: user.jwt,
            provider: user.provider,
        };
    }

    static refreshToken(user) {
        const jwt = this.JWTUserService.refreshUserToken(user);
        user.jwt = jwt;
        return this.generateUserResponse(user);
    }

    static async sendEmail(user, emailTemplate, tokenTimeOutInMinutes = config.session.timeout) {
        const signedObj = {
            email: user.email,
            _id: user._id,
            roles: user.roles
        };
        const token = crypto.generateJWTBasedOnTime(signedObj,tokenTimeOutInMinutes);
        const data = {
            user,
            token,
            baseUrlWeb: config.baseUrlWeb
        };
        await MailEmailNotification.send(user.email, emailTemplate, data);
    }
}

AuthenticationService.UserModel = UserModel;
AuthenticationService.JWTUserService = JWTUserService;
AuthenticationService.USERS = USERS;
AuthenticationService.crypto = crypto;
module.exports = AuthenticationService;


