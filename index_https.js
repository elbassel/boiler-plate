
const http = require('http');
const express = require('express');
const config = require('./server/config');
const utils = require('./server/common/utils');
const database = require('./server/database');
const passport = require('./server/config/auth/passport');
const https = require('https');
const fs = require('fs');
const path = require('path');
// const cache = require('./helpers/cache');
// const logger = require('./helpers/logger');

class Server {
    constructor(serverConfig) {
        this._config = serverConfig;
        this.app = express();

        // this.server = http.createServer(this.app);

        const httpOptions = {
            cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
            key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
        };

        this.server = https.createServer(httpOptions, this.app);
        this.app.use(passport.initialize());
    }

    async preInitialize() {
        try {
            await database.connect();
            // await cache.initialize();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        // Apply express configurations
        const expressRouter = require('./server/controllers/routes');
        const expressConfig = require('./server/config/express');

        // Initialize socket.io
        expressConfig(this.app, expressRouter, this.config);
    }

    async start() {
        await this.preInitialize();
        await new Promise((resolve, reject) => {
            this.server.on('error', (err) => {
                if (err.syscall !== 'listen') {
                    return reject(err);
                }

                switch (err.code) {
                        case 'EACCES':
                            console.error(`port ${err.port} requires elevated privileges`);
                            process.exit(1);
                            break;
                        case 'EADDRINUSE':
                            console.error(`port ${err.port} is already in use`);
                            process.exit(1);
                            break;
                        default:
                            reject(err);
                }
            });

            this.server.on('listening', () => {
                resolve();
            });

            this.server.listen(this._config.api.port);
        });

        const info = this.server.address();
        console.log(`Running API server at ${info.address}:${info.port} on ${process.env.NODE_ENV || 'development'}`);
    }

    async stop() {
        if (!utils.inDevelopment()) {
            return;
        }

        if (this.server && this.server.listening) {
            await database.close();
            this.server.close();
        }
    }
}

const server = new Server(config);

if (!module.parent) {
    server.start();
}

module.exports = server;

