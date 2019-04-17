const BaseEmailNotification = require('./BaseEmailNotification');
const { WELCOME } = require('../../helpers/constants/mail');
class WelcomeEmailNotification extends BaseEmailNotification {
    constructor() {
        super(WELCOME);
    }
}

module.exports = new WelcomeEmailNotification();