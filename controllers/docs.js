const express = require('express');
const path = require('path');
const utils = require('../helpers/utils');
module.exports = (app) =>{
    if(utils.inDevelopment()) {
        const files = path.join(__dirname, '../docs/swagger-ui');
        const oaSpecs = path.join(__dirname, '../api.yml');
        app.use('/swagger-ui', express.static(files));
        app.use('/swagger-ui/api.yaml', express.static(oaSpecs));
        app.get('/docs', (req, res, next)=>{
            try {
                const view = path.join(__dirname, '../docs/swagger-ui/index.html');
                return res.sendFile(view);
            } catch (err) {
                return next(err);
            }
        });
    }
};
