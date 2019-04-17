const _ = require('lodash');
// const cache = require('../cache');
const { BusinessValidationError } = require('../helpers/errors');
const storage = require('../helpers/storage');
const ObjectId = require('mongodb').ObjectID;

class BaseService {
    constructor(model){
        this._model = model;
        this._storage = storage;
        this.ObjectId = ObjectId;
    }

    async initialize(){

    }

    async findById(id, options = {}) {
        return this._model.findById(id, options);
    }

    async findOne(filter = {}, options = {}) {
        return this._model.findOne(filter, options);
    }

    async find(filter = {}, params = {} , paginate = true) {
        let result = {};
        const { page, limit, sort, projection } = params;
        const options = {};

        try {
            if (paginate) {
                options.limit = limit;
                options.skip = limit * page;
            }

            if (sort) {
                options.sort = sort;
            }

            if (projection) {
                options.projection = projection;
            }

            const documents = await this._model.find(filter, options);

            if (paginate) {
                let count = await this._model.count(filter);

                const pagesCount = Math.ceil(count / limit) || 1;
                result = {
                    [this._model.name]: documents,
                    page: params.page,
                    pages: pagesCount,
                };
            }

            return result;
        } catch(err){
            throw err;
        }
    }

    async create(doc) {
        return this._model.create(doc);
    }

    async doesExists(query) {
        const existingDocument =  await this.findOne(query);
        return !!existingDocument;
    }

    async doesNotExist(query) {
        const existingDocument =  await this.findOne(query);
        return !existingDocument;
    }

    async throwIfExisted(query, errMsg) {
        const exists = await this.doesExists(query, errMsg)
        if(exists) {
            throw new BusinessValidationError(errMsg);
        }
    }

    async throwIfNotExisted(query, errMsg) {
        const exists = await this.doesNotExist(query, errMsg)
        if(exists) {
            throw new BusinessValidationError(errMsg);
        }
    }

    async createUniqueDocument(doc, query, errMsg) {
        try {
            await this.throwIfExisted(query, errMsg);
            return this._model.create(doc);
        } catch (e) {
            throw e;
        }
    }

    async updateUniqueDocument(doc, query, errMsg) {
        try {
            const existingDocument =  await this.findOne(query);
            if (existingDocument && existingDocument._id !== doc._id) {
                throw new BusinessValidationError(errMsg);
            }
            const { _id } = doc;
            delete doc._id;
            const result = await this.findByIdAndUpdate(_id, doc);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async findByIdAndUpdate(id, update, options={returnOriginal: false}) {
        return this._model.findByIdAndUpdate(id, update, options);
    }

    async updateById(id, update, options = {}){
        options.returnOriginal = false;
        const result = await this._model.updateById(id, update, options);
        return result && result.value;
    }

    async deleteById(id, options = {}) {
        return this._model.deleteById(id, options);
    }

    get storage() {
        return this._storage;
    }

    async uploadFile(files) {
        let result = [];
        if (files && files.length > 0) {
            result = await storage.uploadFiles(files);
        }
        return result.length > 0? result[0]: undefined;
    }

    async deleteFile(fileUrl) {
        storage.deleteFiles([fileUrl])
    }

    async deleteFiles(fileUrls) {
        storage.deleteFiles(fileUrls);
    }


    async uploadFiles(files) {
        return storage.uploadFiles(files);
    }
}

module.exports = BaseService;
