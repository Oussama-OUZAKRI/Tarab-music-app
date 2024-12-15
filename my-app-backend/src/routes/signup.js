import express from "express";
import signupController from '../controllers/userController.js';
import emailController from '../controllers/emailController.js';

const router = express.Router();

router.post('/register', signupController);
router.post('/check-email', emailController);

export default router;
