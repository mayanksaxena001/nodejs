import * as Todo from './todo.router';
import * as Login from './login.router';
import * as Signup from './signup.router';
import * as Logout from './logout.router';
import express from 'express';
const router = express.Router();
export default (app) => {

    app.get("/", function (req, res) {
        res.render('login');
    });
    app.use('/api', Todo.router);
    app.use('/login', Login.router);
    app.use('/signup', Signup.router);
    app.use('/logout', Logout.router);
}