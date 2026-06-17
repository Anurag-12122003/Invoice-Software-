import express from 'express';
import ProfileController from '../controller/profile.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const profileRouter= express.Router();
const userController=new ProfileController()

profileRouter.get(
   "/profile",
   protect,
   userController.getProfile
);

profileRouter.patch(
   "/update-profile",
   protect,
 userController.updateProfile)

export default profileRouter;