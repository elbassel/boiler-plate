const EMAIL_TYPES  = require('../helpers/constants/mail');
const api = {
    version: '1.0',
    host: 'localhost',
    port: 3000,
    token: '122'
};

module.exports = {
    api,
    expressSession: {
        'secret': 'ASSA&*%F$$#D2', 
        resave: true, 
        saveUninitialized: true 
    },
    databases: {
        mongo: {
            host: 'mongodb://developer:x6tCqHJw32582VeY@35.237.223.245',
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
        projectId: 'learned-alcove-236001',
        keyFile: `${__dirname}/keys/storage.json`,
        bucket: 'pricelap-development',
        url: 'https://storage.googleapis.com/pricelap-development',
    },
    facebook: {
        clientID: '978221015900656',
        clientSecret: '50599e03ea4bc1baa82e12de415e9859',
        callbackURL: `https://${api.host}:${api.port}/api/auth/facebook/callback`,
        profileFields: ['name', 'email']
    },
    google: {
        'clientID': '139805002612-c10uj887j4gq5e03obb46j01ohub1mft.apps.googleusercontent.com',
        'clientSecret': 'dOD3QKXy7upBirQrKoSBzpGy',
        'callbackURL': 'http://localhost:3000/api/auth/google/callback'
    },
    twitter: {
        'consumerKey': 'NGZE2VMcBIJHljVCyp6KZQUcw',
        'consumerSecret': 'GXNVblqktxNc7zLkyqneXrsLvJhqsjxA6UpA5YCmSfOQz8YKkI',
        'callbackURL': 'http://localhost:3000/api/auth/twitter/callback',
        includeEmail: true
    },
    jwt: {
        key: '@#dssd09*76&&'
    },
    session: {
        timeout: 1000000000000000//in Minutes
    },
    emails: {
        [EMAIL_TYPES.WELCOME.EMAIL]: {
            secure: true,
            auth: {
                user: 'XXX@xx.xx',
                pass: '**********'
            },
            'host' : 'smtp.gmail.com',
            'port' : '465'
        },
        [EMAIL_TYPES.MAIL.EMAIL]:  {
            secure: true,
            auth: {
                user: 'XXX@xx.xx',
                pass: '**********'
            },
            'host' : 'smtp.gmail.com',
            'port' : '465'
        },
    }
};
