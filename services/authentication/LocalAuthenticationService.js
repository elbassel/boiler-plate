const _ = require('lodash')
const UserService = require('../users/UserService');
const AuthenticationService = require('./AuthenticationService');
const { User } = require('../../database/models/');
const crypto = require('../../helpers/crypto');
const { BUSINESS_ERROR_MSG, BusinessValidationError, NotFoundError } = require('../../helpers/errors/index');
const {
    WelcomeEmailNotification,
    MailEmailNotification
} = require('../mails/');
const config = require('../../config');
const { WELCOME, MAIL } = require('../../helpers/constants/mail');
class LocalAuthenticationService  extends AuthenticationService {
    static async login(user) {
        try {
            const exisitingUser = await User.findOne({email: user.email})
            const isAuthenticated = await crypto.isValidPassword(user.password, exisitingUser);
            if(!isAuthenticated) {
                throw new BusinessValidationError(BUSINESS_ERROR_MSG.AUTHENTICATION_FAIL);
            }
            return  this.refreshToken(exisitingUser);
        } catch (e) {
            throw e;
        }
    }

    static async register(user) {
        try {
            const newUser = await UserService.create(user);
            const jwt = this.JWTUserService.refreshUserToken(user);

            newUser.jwt = jwt;
            WelcomeEmailNotification.send(user.email, WELCOME.TEMPLATES.WELCOME, user);
            this.sendConfirmRequest(newUser);
            return this.generateUserResponse(user);
        } catch (e) {
            throw e;
        }
    }

}

module.exports = LocalAuthenticationService;
