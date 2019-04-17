const AuthenticationService = require('./AuthenticationService');
const _ = require('lodash');
const { MAIL } = require('../../helpers/constants/mail');
const config = require('../../config')
const { NotFoundError } = require('../../helpers/errors');
class ForgettingPassword extends AuthenticationService{
    static async sendForgetPasswordEmail(email) {
        try {
            const user = await this.UserModel.findOne({email});
            if(_.isNil(user))
                throw new NotFoundError();
            await this.sendEmail(user, MAIL.TEMPLATES.FORGET_PASSWORD);
        } catch (e) {
            throw e;
        }
    }

    static async resetPassword(user, password) {
        try {
            const hashedPassword = await this.crypto.createHash(password)
            const result = await this.UserModel.updateById(user._id, {password: hashedPassword});
            if(_.isNil(result.n = 0))
                throw new NotFoundError();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ForgettingPassword;