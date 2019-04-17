const http = require('http');
const express = require('express');

class Server {
    constructor(config) {
        const { port, middlewares, onStart, onClose } = config;

        this._port = port || process.env.PORT;
        this._middlewares = middlewares || [];
        this._onStart = onStart;
        this._onClose = onClose;

        this._app = express();
        this._server = http.createServer(this._app);
    }

    _applyMiddlewares(){
        this._middlewares.forEach((mw) => {
            if(Array.isArray(mw)) {
                this._app.use(...mw);
            } else {
                this._app.use(mw);
            }
        });
    }

    async start() {
        if(this._onStart) {
            await this._onStart(this._app);
        }

        this._applyMiddlewares();
        await new Promise((resolve, reject) => {
            this._server.on('error', (err) => {
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
                            if(this._onError) {
                                this._onError(err);
                            }
                            reject(err);
                }
            });

            this._server.on('listening', () => {
                resolve();
            });

            this._server.listen(this._port);
        });

        const info = this._server.address();
        console.log(`Running API server at ${info.address}:${info.port} on ${process.env.NODE_ENV || 'development'}`);
    }

    async stop() {
        if(this._onClose) {
            await this._onClose();
        }

        if (this._server && this._server.listening) {
            this._server.close();
        }
    }
}

module.exports = Server;
