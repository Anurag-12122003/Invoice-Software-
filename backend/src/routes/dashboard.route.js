import express from 'express';
import DashboardController from '../controller/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const dashboardRouter=express.Router();
const dashboardController= new DashboardController();

dashboardRouter.get('/dashboard',protect,dashboardController.getDashboard);

export default dashboardRouter;