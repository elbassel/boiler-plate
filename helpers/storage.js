const _ = require('lodash');
const path = require('path');
const uniqid = require('uniqid');
const { Storage } = require('@google-cloud/storage');
const config = require('../config');

const storage = new Storage({
    projectId: config.storage,
    keyFilename: config.storage.keyFile,
});

class GoolgeStorage {
    constructor() {
        this.bucket = storage.bucket(config.storage.bucket);
    }

    /**
     * @param ext (including dot ex: .jpg)
     * @returns string
     * @private
     */
    _generateFileName(ext) {
        return uniqid() + ext;
    }

    /**
     * @param fileName
     * @returns {Promise<file public url>}
     * @private
     */
    _makeFilePublic(fileName) {
        const file = this.bucket.file(fileName);
        return file.makePublic().then(() => {
            return this.getPublicUrl(fileName);
        });
    }

    /**
     * @param buffer: data to be stored
     * @param fileName: string
     * @private
     */
    async _uploadBuffer(buffer, fileName, mimetype) {
        const file = this.bucket.file(fileName);
        return new Promise((resolve, reject) => {
            const stream = file.createWriteStream({
                gzip: true,
                metadata: {
                    contentType: mimetype,
                    cacheControl: 'public, max-age=31536000',
                },
            });

            stream.on('error', (err) => reject(err));
            stream.on('finish', () => resolve());
            stream.end(buffer);
        });
    }

    /**
     * @param filename
     * @returns {string: cloud storage full url}
     */
    getPublicUrl(filename) {
        return `${config.storage.url}/${filename}`;
    }

    /**
     * @param file: express req.file (multipart)
     * @returns {string: cloud storage create file url}
     */
    async uploadReqFile(file) {
        if(_.isArray(file)){
            throw new Error('Only single file allowed with this function');
        }

        const ext = path.extname(file.originalname);
        const fileName = this._generateFileName(ext);

        return this._uploadBuffer(file.buffer, fileName, file.mimetype, true)
            .then(() => this._makeFilePublic(fileName))
            .then(() => this.getPublicUrl(fileName));
    }

    /**
     * upload multipart file or files
     * @param files: request multipart files (buffer)
     * @returns {Promise<>}
     */
    async uploadFiles(files) {
        let rFiles = files;

        if (_.isNil(files)) {
            return [];
        }

        if (!_.isArray(files)) {
            rFiles = [files];
        }

        const tasks = [];
        for (let i = 0; i < rFiles.length; i += 1) {
            const file = rFiles[i];
            tasks.push(this.uploadReqFile(file));
        }

        return Promise.all(tasks);
    }

    /**
     * Delete files from storage based on it urls
     * @returns {Promise<void>}
     */
    async deleteFiles(urls) {
        let rUrls = urls;

        if (_.isNil(urls) || urls.length === 0) {
            return;
        }

        if (!_.isArray(urls)) {
            rUrls = [urls];
        }

        const tasks = [];
        for (let i = 0; i < rUrls.length; i += 1) {
            if (_.isNil(rUrls[i])) {
                continue;
            }

            const idx = rUrls[i].lastIndexOf('/') + 1;
            const fileName = rUrls[i].substring(idx);

            const file = this.bucket.file(fileName);
            tasks.push(file.delete());
        }

        return Promise.all(tasks);
    }
}

module.exports = new GoolgeStorage();
