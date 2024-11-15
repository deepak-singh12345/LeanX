import express from 'express';
import {registerUser, login, logout} from '../controller/userController.js';
const router = express.Router();

router.route('/')
    .post(registerUser)

router.route('/auth')
    .post(login);

router.route('/logout').post(logout);


// export router
export default router
