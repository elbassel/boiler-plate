const _ = require('lodash');
const Validator = require('ajv');
const ObjectId = require('mongodb').ObjectID;
const { ValidationError, UnexpectedError } = require('../../helpers/errors');
const { BUSINESS_ERROR_MSG, TECHNICAL_ERROR_MSG } = require('../../helpers/errors')

/**
 * schema is just for reference we do not use it
 * Options: {
 *   validation: {
 *       create: schema (ajv schema),
 *       update: schema (ajv schema)
 *   },
 *   timestamp: boolean,
 *   indexes: [ {email: 1}]
 * }
 */
class Model {
    constructor(name, schema, options = {}){
        this._name = name.toLowerCase();

        this._db = null;
        this.schema = schema;
        this._model = null;
        this._options = options;

        // Validation
        this._validator = new Validator();
        this._validation = options.validation || {};
    }

    _validateDB(){
        if(!this._db) {
            throw new UnexpectedError(TECHNICAL_ERROR_MSG.MODEL_NOT_REGISTERED);
        }
    }

    _validateDocument(document, schema = {}, strict = true){
        let validationSchema = schema;
        if(!strict){
            validationSchema = _.omit(validationSchema, ['required']);
        }
        const result = this._validator.validate(validationSchema, document);
        if(!result){
            throw new ValidationError(this._validator.errors, BUSINESS_ERROR_MSG.DEFAULT_VALIDATION_ERROR);
        }
    }

    preSave(doc){
        if(this._options.timestamp){
            doc.createAt = new Date(Date.now());
            doc.updatedAt = new Date(Date.now());
        }
    }

    preUpdate(doc) {
        if(this._options.timestamp){
            doc.updatedAt = new Date(Date.now());
        }
    }

    get name(){
        return this._name;
    }

    get options(){
        return this._options;
    }

    set database(db){
        this._db = db;
        this._model = this._db.collection(this._name);
    }

    get database(){
        return this._db;
    }

    get model(){
        return this._model;
    }

    async exists(filter) {
        const exists = await this._model.findOne(filter);
        return !_.isNil(exists);
    }

    async create(doc) {
        const document = doc;
        const vSchema = this._validation.create;
        if(vSchema) {
            this._validateDocument(document, vSchema);
        }

        await this.preSave(doc);
        const result = await this._model.insertOne(document);
        return result.ops[0];
    }

    async updateById(id, update, options){
        const document = update;
        const vSchema = this._validation.update;
        if(vSchema) {
            this._validateDocument(document, vSchema, false);
        }


        await this.preUpdate(document);
        return this._model.findOneAndUpdate({_id: new ObjectId(id)}, {$set: document}, options);
    }

    async updateOne(filter, update, options){
        const document = update;
        this._validateDocument(document);

        this.preUpdate(document);
        return this._model.findOneAndUpdate(filter, {$set: document}, options);
    }

    async find(filter, options){
        const parsedFilter = Model.parseObjectIdFilterFields(filter, this.schema);
        return this._model.find(parsedFilter, options).toArray();
    }

    async findOne(filter, options){
        // const parsedFilter = Model.parseObjectIdFilterFields(filter, this.schema);
        return this._model.findOne(filter, options);
    }
    async findByIdAndUpdate(id, update, options){
        const result = await this._model.findOneAndUpdate({_id: new ObjectId(id)}, {$set: update}, options);
        return result.value;
    }

    async findById(id, options){
        return this._model.findOne({_id: new ObjectId(id)}, options);
    }

    async deleteOne(filter, options) {
        return this._model.findOneAndDelete(filter, options);
    }

    async deleteById(id, options) {
        return this._model.findOneAndDelete({ _id: new ObjectId(id)}, options);
    }

    async count(query){
        this._validateDB();
        return this._model.countDocuments(query);
    }

    static parseObjectIdFilterFields(filter, schema) {
        const parsedFilter = {};
        _.forEach(filter, function(value, key) {
            if(_.isNil(value) || _.isEmpty(value)) return;
            parsedFilter[key] = value;
            if(schema[key].type === 'ObjectId') {
                parsedFilter[key] = new ObjectId(value);
            }
        });
        return parsedFilter;
    }
}

module.exports = Model;
