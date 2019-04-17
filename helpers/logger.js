const config = require('../config');
const { createLogger, format, transports } = require('winston');
const { json, combine, timestamp, prettyPrint } = format;

class Logger {
    constructor(){
        try {
            this.logger = createLogger({
                level: 'info',
                format: combine(
                    json(),
                    timestamp(),
                    prettyPrint(),
                ),
                transports: [
                    new transports.Console()
                ]
            });
        } catch (err) {
            throw err;
        }
    }

    log(level, payload) {
        try {
            const logLevel = (payload && payload.level) || 'info';

            this.logger.log({
                level: logLevel,
                version: config.api.version,
                ...payload,
            });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new Logger();
