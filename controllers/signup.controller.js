import UserRepository from '../mysql/db/user.repository';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
const repo = new UserRepository();
export default class SignupController {
    constructor() { }
    get_req(req, res) {
        res.render('signup');
    }

    post_req(req, res) {
        passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/logout',
        }, (err, user, callback) => {
            // app.use('/login', Login.router);(err)=> {
            //     res.status(405).send(err);
            // }
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

    default_req(req, res, callback) {
        console.log('default gateway | signup : ', req.method, req.url);
        callback();
    }

    findById(id, done) {
        repo.getById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    }

    signup(req, username, password, done) {
        repo.findByUserName(username).then((user) => {
            if (user) {
                return done(null, false, {
                    message: 'That username is already taken'
                });
            } else {
                var userPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                var data =
                    {
                        username: username,
                        password: userPassword,
                        name: req.body.name,
                        email: req.body.email
                    };
                repo.create(data).then((newUser, created) => {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                }).catch((err) => {
                    throw new Error(err);
                });
            }
        }).catch((err) => {
            console.log("Error:", err);
            return done(null, false, {
                message: err
            });
        });
    }
}