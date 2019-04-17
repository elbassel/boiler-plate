const _ = require('lodash');

const convertQueryString = (params) => {
    const result = {
        dbQueryParams:{
            page: 0,
            limit: 100,
        },
        filter: {},
        _options: {},
    };

    let buffer;
    let { dbQueryParams, filter } = result;
    _.forEach(params, (value, key) => {
        switch (key) {
            case 'page':
                buffer = parseInt(value || 0, 10);
                dbQueryParams.page = buffer >= 0 ? buffer : 0;
                break;
            case 'limit':
                buffer = parseInt(value || 0, 10);
                dbQueryParams.limit = buffer > 100 ? 100 : buffer;
                break;
            case 'fields':
                dbQueryParams.projection = value.split(',')
                    .reduce((fields, item) => fields = Object.assign(fields, ggenereateProjectionFieldObject(item.trim())), {});
                break;
            case 'sort':
                dbQueryParams.sort = value.split(',')
                    .reduce((fields, item) => fields = Object.assign(fields, generateSortFieldObject(item.trim())), {});
                break;
            default:
                filter[key] = value;
        }
    });
    return result;
};

module.exports = async (req, res, next) => {
    try {
        // Get user ip
        req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        req.query = convertQueryString(req.query);
    } catch (e) {
        next(e);
    }

    next();
};


function generateSortFieldObject(fieldName) {
    const ASC = 1, DESC = -1;
    return generateFieldObject(fieldName, ASC, DESC);
}

function ggenereateProjectionFieldObject(fieldName) {
    const SHOW_FIELD = 1, HIDE_FIELD = 0;
    return generateFieldObject(fieldName, SHOW_FIELD, HIDE_FIELD);
}

function generateFieldObject(fieldName, value, oppositeValue) {
    let sorting = 1;
    let tempField;

    if(fieldName.startsWith('-')) {
        sorting = oppositeValue;
        tempField = fieldName.substr(1);
    } else {
        sorting = value;
        tempField = fieldName;
    }

    return {[tempField] : sorting};
}
