import express from 'express';
import createUser from '../Controller/User.js';


const router = express.Router();


router.post('/employees',createUser);


export default router;