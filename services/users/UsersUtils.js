const { ROLES } = require('../../helpers/constants/user');

class UsersUtils {
    static doesUserHasRoles(user, roles) {
        return roles.find(role => user.roles.includes(role));
    }

    static isUserAnEmployee(user) {
        return user.roles.length > 1;
    }
}

module.exports = UsersUtils;