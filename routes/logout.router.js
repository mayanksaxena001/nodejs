import LogoutController from '../controllers/logout.controller';
let logout = new LogoutController();
import express from 'express';
export const router = express.Router();
router.route('/').get(logout.logout);