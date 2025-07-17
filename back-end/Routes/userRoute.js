import express from 'express';
import createUser from '../Controller/User.js';


const router = express.Router();

router.post('/employees', createUser);


router.post('/login', loginUser);

export default router;