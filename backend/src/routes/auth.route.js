import express from 'express';
import AuthController from '../controller/auth.controller.js';
const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/sign-up', authController.signup)
authController.post('/log-in',authController.login);
authController.post('/log-out',authController.logout);

authController.get('/dashboard',(req,res)=>{
    res.send("it is a dashboard page")
})


export default authRouter;