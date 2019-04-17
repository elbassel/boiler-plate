const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const config = require('../config');
const { BUSINESS_ERROR_MSG, UnauthorizedError }  = require('./errors');

class Crypto {
    static verifyToken(token) {
        return new Promise((resolve, reject)=>{
            jwt.verify(token, config.jwt.key, (err, decoded) =>{
                if (!err) {
                    return resolve(decoded);
                }
                return reject(new UnauthorizedError(BUSINESS_ERROR_MSG.AUTHORIZATION_ERROR, err));
            });
        });
    }

    static generateJwt(obj) {
        const expiry = new Date();
        const signObj = { ...obj };

        const sessionTimeOut = parseInt(config.session.timeout);
        signObj.exp = parseInt(expiry.getTime() / 1000) + 60 * sessionTimeOut;
        let token = jwt.sign(signObj, config.jwt.key);
        return token;
    }

    static generateJWTBasedOnTime(obj, minutes){
        const expiry = new Date();
        let signObj = {...obj};
        const timeout = parseInt(minutes);
        signObj.exp = parseInt(expiry.getTime() / 1000) + 60 * timeout;
        let token = jwt.sign(signObj, config.jwt.key);
        return token;
    }

    static async createHash(password) {
        return bcrypt.hash(password, 10);
    }

    static async compareHash(text, hash) {
        return bcrypt.compare(text, hash);
    }

    static async isValidPassword(password, hashedPassword) {
        return this.compareHash(password, hashedPassword);
    }
}

module.exports = Crypto;

