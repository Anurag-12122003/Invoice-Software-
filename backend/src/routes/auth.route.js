import express from 'express';
import AuthController from '../controller/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/sign-up', authController.signup)
authRouter.post('/log-in',authController.login);
authRouter.post('/log-out',authController.logout);

authRouter.delete('/delete-account',protect,authController.deleteUserAccount)

// 2. Added: Email Verification Route
// Frontend se data is par aayega: { "email": "...", "verificationCode": "..." }
authRouter.post('/verify-email', authController.verifyEmail);

// --- PASSWORD RESET ROUTES ---
authRouter.post('/forgot-password', authController.forgotPassword); // Step 1: Send OTP
authRouter.post('/reset-password', authController.resetPassword);   // Step 2: Verify & Change


export default authRouter;