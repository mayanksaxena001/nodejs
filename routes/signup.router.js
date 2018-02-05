import SignupController from '../controllers/signup.controller';
let signup = new SignupController();
import express from 'express';
export const router = express.Router();
// default gateways
router.use("/", signup.default_req);

router.route('/')
    .get(signup.get_req)
    .post(signup.post_req);
