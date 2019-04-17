const AccessControl = require('accesscontrol');
const RESOURCES = require('./resource-names');
const grantsObject = {
    admin: {
        [RESOURCES.USER]: { 'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'] },
        [RESOURCES.COUNTRY]: { 'read:any': ['*'], 'update:any': ['*'] },
        [RESOURCES.BRAND]: { 'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'] },
        [RESOURCES.CONFIRM]: {'read:any': ['*']},
        [RESOURCES.STORES]: { 'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'] },
        [RESOURCES.RESET_PASSWORD]: {'update:any': ['*']},
        [RESOURCES.CATEGORY]: { 'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'] },
    },
    user: {
        [RESOURCES.CONFIRM]: {'read:own': ['*']},
        [RESOURCES.RESET_PASSWORD]: {'update:own': ['*']}
    },
    guest: {


    },
};

module.exports = new AccessControl(grantsObject);
