import express from 'express'

const router = express.Router();

import {createUser, getAllUsers} from '../controller/userController.js'


router
    .route('/')
    .post(createUser)
    .get(getAllUsers)


export default router;
