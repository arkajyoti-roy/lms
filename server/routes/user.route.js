import express from 'express';
import { signup, login, getUserProfile, logout } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/logout').get(logout);

export default router;
