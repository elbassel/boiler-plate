const UserModel = require('../../database/models/User');
const SecurityUtils = require('../../helpers/crypto');
class JWTUserService{
    static async refreshUserToken(user) {
        try {
            const signObj = {
                email: user.email,
                _id: user._id,
                roles: user.roles,
            };
            const jwt = SecurityUtils.generateJwt(signObj);
            user.jwt = jwt;
            return jwt;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = JWTUserService;
