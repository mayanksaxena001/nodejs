import bcrypt from 'bcrypt-nodejs';
import passport_local from 'passport-local';
import passport from 'passport';
import SignupController from '../controllers/signup.controller';
import LoginController from '../controllers/login.controller';
import { user } from '../mysql/models/models';
import session from 'express-session';
const signCtrl = new SignupController();
const loginCtrl=new LoginController();

const strategy = (passport, user) => {
    var User = user;
    var LocalStrategy = passport_local.Strategy;
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, signCtrl.signup
    ));
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, loginCtrl.login
    ));
    //serialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // deserialize user 
    passport.deserializeUser(signCtrl.findById);
}

export default (app) => {
    // For Passport
    app.use(session({
        secret: 'Mayank',
        resave: true,
        saveUninitialized: true
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    //load passport strategies
    strategy(passport, user);
}