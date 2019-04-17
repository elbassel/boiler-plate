const config = require('../config');
const Database = require('./types/Database');
const { mongo } = config.databases;
const models = require('./models');
var modelsInArray = Object.keys(models).map(key => models[key]);
module.exports = new Database({
    host: mongo.host,
    port: mongo.port,
    name: mongo.name,
    options: { useNewUrlParser: true },
    models: [
        ...modelsInArray
    ]
});
