const Index = require('../controllers/index');
const auth = require('../controllers/auth');
const users = require('../controllers/users/users');

module.exports = [
    ['/', Index],
    ['/api', auth],
    ['/api/users', users],
];
