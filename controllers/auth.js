var express = require('express');
var router = express.Router();
const passport = require('../config/auth/passport');
const RESOURCES = require('../config/auth/resource-names');

const {
    FacebookAuthentication,
    GoogleAuthentication,
    TwitterAuthentication,
    LocalAuthenticationService,
    EmailConfirmation,
    ForgettingPassword
} = require('../services/authentication');
const {users} = require('../helpers/validation');

router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {failureRedirect: '/api/login/failure'})
);

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/api/login/failure'}),
    async (req, res, next) => {
        try {
            const user = await FacebookAuthentication.login(JSON.parse(req.user._raw));
            res.send(user);
        } catch (e) {
            next(e);
        }
    });

router.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ], failureRedirect: '/api/login/failure'
}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/api/login/failure'
    }), async (req, res, next) => {
        try {
            const user = await GoogleAuthentication.login(req.user._json);
            res.send(user);
        } catch (e) {
            next(e);
        }
    });

router.get('/auth/twitter', passport.authenticate('twitter', {failureRedirect: '/api/login/failure'}));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/api/login/failure'
    }), async (req, res, next) => {
        try {
            const user = await TwitterAuthentication.login(req.user._json);
            res.send(user);
        } catch (e) {
            next(e);
        }
    });


router.post('/auth/login',
    passport.authenticate('local', {failureRedirect: '/api/login/failure'}),
    (req, res, next) => {
        try {
            res.send(req.user);
        } catch (e) {
            next(e);
        }

    });

router.post('/auth/register', async (req, res, next) => {
    try {
        req.validate(users.regiter, req.body);
        const registeredUser = await LocalAuthenticationService.register(req.body);

        res.send(registeredUser);
    } catch (e) {
        next(e);
    }
});

router.get('/users/:id/email/confirm/request', async(req, res, next)=>{
    try {
        await req.authorize(req.user, RESOURCES.CONFIRM, ['readOwn'], async ()=> req.user._id === req.params.id);
        EmailConfirmation.sendConfirmRequest(req.user);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
})

router.get('/users/email/confirm', async (req, res, next) => {
    try {
        const { token } = req.query.filter;
        await EmailConfirmation.confirmEmail(token);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
});

router.post('/auth/forgetpassword/request', async (req, res, next) => {
    try {
        const { email } = req.body;
        ForgettingPassword.sendForgetPasswordEmail(email);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
});

router.post('/users/:id/forgetpassword/reset', async (req, res, next) => {
    try {
        await req.authorize(req.user, RESOURCES.RESET_PASSWORD, ['updateOwn'], async ()=> req.user._id === req.params.id);
        const { password } = req.body;
        await ForgettingPassword.resetPassword(req.user, password);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
