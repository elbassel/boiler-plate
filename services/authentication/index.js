const FacebookAuthentication = require('./FacebookAuthentication');
const GoogleAuthentication = require('./GoogleAuthentication');
const TwitterAuthentication = require('./TwitterAuthentication');
const LocalAuthenticationService = require('./LocalAuthenticationService');
const AuthenticationService  = require('./AuthenticationService')
module.exports = {
    AuthenticationService,
    FacebookAuthentication,
    GoogleAuthentication,
    TwitterAuthentication,
    LocalAuthenticationService,
    EmailConfirmation : require('./EmailConfirmation'),
    ForgettingPassword : require('./ForgettingPassword')
};
