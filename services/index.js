const authentication = require('./authentication');
const UserServices = require('./users');

module.exports = {
    ...UserServices,
    ...authentication,
};
