const api = {
    version: '1.0',
    host: 'localhost',
    port: 3000,
    token: '122'
};

module.exports = {
    api: {
        version: '1.0',
        host: 'localhost',
        port: 3443,
        token: '122'
    },
    databases: {
        mongo: {
            host: 'localhost',
            port: 27017,
            name: 'pricelab',
        },
        redis: {
            host: 'localhost',
            port: 6379,
            db: 0,
        },
    },
    facebook: {
        clientID: process.env.facebookClientId,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: `https://${api.host}:${api.port}/api/auth/facebook/callback`,
        profileFields: ['name', 'email']
    },
    jwt: {
        key: '@#dssd09*76&&'
    },
    session: {
        timeout: 1000000000000000//in Minutes
    }
};
