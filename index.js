const Server = require('./server');
const database = require('./database');
const middlewares = require('./server/middlewares');

const server = new Server({
    port: 3000,
    middlewares,
    onStart: async (app) => {
        // Apply security
        app.disable('x-powered-by');
        app.disable('etag');
        // Connect to database

        await database.connect();
        require('./controllers/docs')(app);

        // Create admin for test
        const UserService = require('./services/users/UserService');
        const crypto = require('./helpers/crypto');
        let user = await UserService.doesExists({ email: 'admin@pricelap.com'});
        if(!user) {
            user = await UserService.create({
                email: 'admin@pricelap.com',
                password: '123456r',
                roles: ['admin']
            });
        }

        console.log(crypto.generateJwt({
            email: user.email,
            _id: user._id,
            roles: user.roles,
        }));
    },
    onClose: async () => {
        await database.close();
    },
});

if (!module.parent) {
    server.start();
}

module.exports = server;
