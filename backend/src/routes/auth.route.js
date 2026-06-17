import express from 'express';
import AuthController from '../controller/auth.controller.js';
const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/sign-up', authController.signup)
authRouter.post('/log-in',authController.login);
authRouter.post('/log-out',authController.logout);

// 2. Added: Email Verification Route
// Frontend se data is par aayega: { "email": "...", "verificationCode": "..." }
authRouter.post('/verify-email', authController.verifyEmail);

// --- PASSWORD RESET ROUTES ---
authRouter.post('/forgot-password', authController.forgotPassword); // Step 1: Send OTP
authRouter.post('/reset-password', authController.resetPassword);   // Step 2: Verify & Change


export default authRouter;