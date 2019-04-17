/* eslint-disable indent */
const passport = require('passport');
const config = require('../index');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { LocalAuthenticationService  } = require('../../services/');
passport.use(new FacebookStrategy(config.facebook,
    (accessToken, refreshToken, profile, done)=> done(null, profile)));

passport.use(new GoogleStrategy(config.google,
    (request, accessToken, refreshToken, profile, done)=> done(null, profile)
));

passport.use(new TwitterStrategy(config.twitter,
    (request, accessToken, refreshToken, profile, done)=> done(null, profile)
));

passport.use(new LocalStrategy(
    async (email, password, done) => {
        try {
            const user = await LocalAuthenticationService.login({email, password});
            done(null, user);
        } catch (e) {
            done(e);
        }
    }
));

passport.serializeUser((user, cb)=> {
    cb(null, user);
});
passport.deserializeUser((obj, cb)=> {
    cb(null, obj);
});

module.exports = passport;
