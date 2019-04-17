const BaseEmailNotification = require('./BaseEmailNotification');
const { MAIL } = require('../../helpers/constants/mail');
class MailEmailNotification extends BaseEmailNotification {
    constructor() {
        super(MAIL);
    }
    sendConfirmationRequest(){
        
    }
}

module.exports = new MailEmailNotification();