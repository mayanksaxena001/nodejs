import UserRepository from '../mysql/db/user.repository';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import TodoController from './todo.controller';
const todoCtrl = new TodoController();
const repo = new UserRepository();
export default class LoginController {
    constructor() { }

    default_req(req, res, callback) {
        console.log('default gateway | login : ', req.method, req.url);
        callback();
    }

    validation_req(req, res, callback, username) {
        console.log('Doing username validations on ' + username);
        callback();
    }

    get_dashboard(req, res) {
        todoCtrl.getAllTodosForUser(req.user).then((todos) => {
            res.render('dashboard', {username:req.user.username,data:todos});
        }).catch((err) => {
            res.render('dashboard');
        });
    }

    get_req(req, res) {
        res.render('login');
    }

    post_req(req, res) {
        passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/logout',
        },(err, user, callback) => {
            if (err) {
                res.status(405).send(err);
            }
            if (user) {
                req.login(user, (err, next) => {
                    if (err) return next(err);
                    res.redirect('/login/user/' + user.username);
                });
            }
            if (callback instanceof Object) {
                res.status(401).send(callback.message);
            }
        })(req, res);
    }

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }

    login(req, username, password, done) {
        const isValidPassword = (userpass, password) => {
            return bcrypt.compareSync(password, userpass);
        }

        repo.findByUserName(username).then((user) => {
            if (!user) {
                return done(null, false, {
                    message: 'Username does not exist.'
                });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user.get());

        }).catch((err) => {
            console.log("Error:", err);
            return done(null, false, {
                message: err
            });
        });
    }
}