import express from 'express';
import {createService} from '../controller/serviceController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';


const router = express.Router();

router.route('/').post(authMiddleware, createService);

export default router;
