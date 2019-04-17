const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require('nodemailer')
const Notification = require('./Notification');
const TEMPLATES_PATH = '../../email-templates';
const config = require('../../config');

class BaseEmailNotification extends Notification {
    constructor(emailType) {
        super();
        this._templates = {};
        this.emailType = emailType;
        this._initMailClient();

    }
    _initMailClient(emailType) {
        this._mailClient = nodemailer.createTransport(config.emails[this.emailType.EMAIL]);

        // Load templates into memory
        const templatesRoot = path.join(__dirname, `${TEMPLATES_PATH}/${this.emailType.TEMPLATES_DIR}`);
        const files = fs.readdirSync(templatesRoot);
        for(let i=0; i < files.length; i += 1){
            const templateName = files[i].substr(0,files[i].length - 5);
            this._templates[templateName] = fs.readFileSync(path.join(templatesRoot, files[i]), 'utf8');
        }
    }

    async send(to, template, data = {}) {
        try {
            const templateContent = this._templates[template.FILE];
            const html = ejs.render(templateContent, data);

            let mailOptions = {
                from: `"${this.emailType.TITLE}" <${config.emails[this.emailType.EMAIL].auth.user}>`, // sender address
                to, // list of receivers
                subject: template.SUBJECT,
                text: '',
                html: html
            };

            // send mail with defined transport object
            let info = await this._mailClient.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        } catch (err) {
            throw err;
        }
    }

}

module.exports = BaseEmailNotification;