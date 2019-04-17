const FACEBOOK = 'facebook', GOOGLE = 'google', TWITTER = 'twitter', LOCAL = 'local';
const GUEST = 'guest', USER = 'user', ADMIN = 'admin', OPERATION = 'operation', STORE_MANAGER = 'store_manager', BRANCH_MANAGER = 'branch_manager';

module.exports = {
    PROVIDERS: {
        FACEBOOK,
        GOOGLE,
        TWITTER,
        LOCAL
    },
    PROVIDERS_ENUM : [FACEBOOK, GOOGLE, TWITTER],
    ROLES: {
        USER,
        ADMIN,
        OPERATION,
        STORE_MANAGER,
        BRANCH_MANAGER
    },
    ROLES_ENUM: [USER, ADMIN, OPERATION, STORE_MANAGER, BRANCH_MANAGER],
};
