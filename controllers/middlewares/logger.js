const logger = require('../../helpers/logger');

module.exports = async (req, res, next) => {
    res.locals.reqTime = process.hrtime();
    res.locals.reqLog = {
        user: 'public',
        method: req.method,
        client: req.headers.client,
        url: req.url,
        source: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };

    res.on('finish', () => {
        if (res.locals && res.locals.reqLog) {
            // Calc time
            const startAt = res.locals.reqTime;
            const diff = process.hrtime(startAt);
            const resTime = diff[0] * 1e3 + diff[1] * 1e-6;

            res.locals.reqLog.responseTime = parseFloat(resTime.toFixed(2));
            res.locals.reqLog.status = res.statusCode;

            logger.log('info', res.locals.reqLog);
        }
    });

    next();
};
