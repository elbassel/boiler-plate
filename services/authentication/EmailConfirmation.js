const AuthenticationService = require('./AuthenticationService');
const { MAIL } = require('../../helpers/constants/mail')
class EmailConfirmation extends AuthenticationService{
    static async sendConfirmRequest(user) {
        try {
            await this.sendEmail(user, MAIL.TEMPLATES.CONFIRM);
        } catch (e) {
            throw e;
        }   
    }

    static async confirmEmail(confirmationToken) {
        try {
            const decodedUser = await this.crypto.verifyToken(confirmationToken);
            await this.UserModel.updateById(decodedUser._id, {confirmed: true});
        } catch (e) {
            throw e;
        }
    }
}

module.exports = EmailConfirmation;
