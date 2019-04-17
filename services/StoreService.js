const _ = require('lodash');
const BaseService = require('./BaseService');
const { Store } = require('../database/models');

const { ValidationError, NotFoundError } = require('../helpers/errors/Errors');

class StoreService extends BaseService {
    constructor() {
        super(Store);
    }

    async create(data, files){
        try {
            if (files) {
                if (files.images && files.images.length > 0) {
                    const rImages = await super.storage.uploadFiles(files.images);
                    data.images = rImages;
                }
            }

            const exists = await super.doesExists({ name: data.name });
            if(exists){
                throw new ValidationError();
            }

            return super.create(data);
        } catch (err) {
            throw err;
        }
    }

    async updateById(id, data, files){
        try {
            const store = await super.findById(id);

            if(_.isNil(store)){
                throw new NotFoundError();
            }

            if(!_.isNil(data.name)) {
                const exists = await super.doesExists({
                    _id: { $ne: store._id },
                    name: data.name
                });
                if (exists) {
                    throw new ValidationError();
                }
            }

            const tImages = _.difference(store.images, data.images);
            if (tImages && tImages.length > 0) {
                await super.storage.deleteFiles(tImages);
            }

            if (!_.isNil(files)) {
                if (files.images && files.images.length > 0) {
                    const rImages = await super.storage.uploadFiles(files.images);
                    data.images = _.concat(data.images || [], rImages);
                }
            }

            return super.updateById(id, data);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new StoreService();
