import express from 'express';
import AuthController from '../controller/auth.controller.js';
const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/sign-up', authController.signup)
authRouter.post('/log-in',authController.login);
authRouter.post('/log-out',authController.logout);

authRouter.get('/dashboard',(req,res)=>{
    res.send("it is a dashboard page")
})


export default authRouter;