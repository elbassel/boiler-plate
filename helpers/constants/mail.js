module.exports = {
    WELCOME: {
        TITLE: 'welcome',
        TEMPLATES_DIR: 'welcome',
        EMAIL: 'welcome',
        TEMPLATES: {
            WELCOME: {
                FILE: 'welcome',
                SUBJECT: 'Welcome'
            },
        }
    },
    MAIL: {
        TITLE: 'Mail',
        TEMPLATES_DIR: 'mail',
        EMAIL: 'mail',
        TEMPLATES: {
            FORGET_PASSWORD: {
                FILE: 'forget',
                SUBJECT: 'Forget password'
            },
            RESET_PASSWORD: {
                FILE: 'reset',
                SUBJECT: 'Reset password'
            },
            CONFIRM: {
                FILE: 'confirm',
                SUBJECT: 'Confirm Email'
            }
        }
    }
};