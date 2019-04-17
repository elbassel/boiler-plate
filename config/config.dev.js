const EMAIL_TYPES  = require('../helpers/constants/mail');
const api = {
    version: '1.0',
    host: 'localhost',
    port: 3000,
    token: '122'
};

module.exports = {
    api,
    baseUrlWeb: 'http://localhost:3000',
    expressSession: {
        'secret': 'ASSA&*%F$$#D2', 
        resave: true, 
        saveUninitialized: true 
    },
    databases: {
        mongo: {
            host: 'mongodb://localhost',
            port: 27017,
            name: 'pricelap',
        },
        redis: {
            host: 'localhost',
            port: 6379,
            db: 0,
        },
    },
    storage: {
        projectId: 'XXXXXXXXX',
        keyFile: `${__dirname}/keys/storage.json`,
        bucket: 'XXXXXXXXXXXXX',
        url: 'https://storage.googleapis.com/pricelap-development',
    },
    facebook: {
        clientID: 'XXXXXXXXXXXX',
        clientSecret: 'XXXXXXXXXXXXX',
        callbackURL: `https://${api.host}:${api.port}/api/auth/facebook/callback`,
        profileFields: ['name', 'email']
    },
    google: {
        'clientID': 'XXXXXXXXXXX',
        'clientSecret': 'XXXXXXXXXXX',
        'callbackURL': 'http://localhost:3000/api/auth/google/callback'
    },
    twitter: {
        'consumerKey': 'XXXXXXXXXXX',
        'consumerSecret': 'XXXXXXXXXXXX',
        'callbackURL': 'http://localhost:3000/api/auth/twitter/callback',
        includeEmail: true
    },
    jwt: {
        key: 'XXXXXXXXXXXX'
    },
    session: {
        timeout: 1000000000000000//in Minutes
    },
    forgetPasswordTimeoutLink: 2880, //in Minutes
    emails: {
        [EMAIL_TYPES.WELCOME.EMAIL]: {
            secure: true,
            auth: {
                user: 'XXXXX@xxx.com',
                pass: '********'
            },
            "host" : "smtp.gmail.com",
            "port" : "465"
        },
        [EMAIL_TYPES.MAIL.EMAIL]:  {
            secure: true,
            auth: {
                user: 'XXXXX@xxx.com',
                pass: '********'
            },
            "host" : "smtp.gmail.com",
            "port" : "465"
        },
    }
};
