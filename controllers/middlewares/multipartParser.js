module.exports = async (req, res, next) => {
    try {
        // Parse body in case of multipart
        if (req.method === 'POST' || req.method === 'PUT') {
            if (req.headers['content-type']
                && req.headers['content-type'].indexOf('multipart/form-data') >= 0
                && req.body && req.body.data) {
                req.body = JSON.parse(req.body.data);
            }
        }
    } catch (e) {
        next(e);
    }

    next();
};
