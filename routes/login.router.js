import LoginController from '../controllers/login.controller';
let login = new LoginController();
// default gateways
import express from 'express';
export const router = express.Router();
router.use('/', login.isLoggedIn,login.default_req);
router.param('username', login.validation_req);

router.route('/')
    .get(login.get_req)
    .post(login.post_req);
router.get('/user/:username', login.isLoggedIn, login.get_dashboard);