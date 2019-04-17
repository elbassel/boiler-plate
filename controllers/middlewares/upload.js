const _ = require('lodash');
const multer  = require('multer');
const { COMMON } = require('../../helpers/constants')
const {BUSINESS_ERROR_MSG, BusinessValidationError} = require('../../helpers/errors');

module.exports = options => async (req, res, next) => {
    const multerConfig = {
        storage: multer.memoryStorage(),
        fileFilter,
        limits: {
            fileSize: options.size? options.size : COMMON.DEFAULT_UPLOADED_IMAGES_SIZE,
        }
    };

    const instance = multer(multerConfig);

    const upload = instance.fields(prepareFieldsOptions(options.fields));
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (e)=> handleUploadError(e, resolve, reject));
        });
        
    } catch (e) {
        return next(e);
    }
    next();


    function fileFilter(req, file, next){
        if(!options.fields[file.fieldname].ext.includes(getFileExtension(file.originalname)))
            return next(new BusinessValidationError(BUSINESS_ERROR_MSG.INVALID_FILE_EXTENSION));
        next(null, true);
    }

    function handleUploadError(e, resolve, reject) {
        if(!e) return resolve();

        let error = e;
        switch(e.code) {
            case 'LIMIT_UNEXPECTED_FILE':
                error = new BusinessValidationError(BUSINESS_ERROR_MSG.UNEXPECTED_FIELD_NAME(options[e.field].maxCount));
                break;
            case 'LIMIT_FILE_SIZE':
                error = new BusinessValidationError(BUSINESS_ERROR_MSG.LIMIT_FILE_SIZE(options.size));
                break;
            default:
            error = e;
        }
        
        reject(error);
    }
}

function getFileExtension(fileName) {
    const nameParts = fileName.split('.');
    return nameParts[nameParts.length -1];
}

function prepareFieldsOptions(options) {
    const fields = [];
    _.forEach(options, (value, key)=>{
        fields.push({name: key, maxCount: value.maxCount})
    })
    return fields;
}


