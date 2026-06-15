import express from 'express';
import CompanyController from '../controller/company.controller.js';
import { protect } from '../middleware/auth.middleware.js';


const companyRouter=express.Router();

const companyController=new CompanyController();

companyRouter.post('/create-company',protect,companyController.createCompany);
companyRouter.get('/companies',protect,companyController.getCompanies);
companyRouter.patch('/update-company/:id',protect,companyController.updateCompany);
companyRouter.delete('/delete-company/:id',protect,companyController.deleteCompany);

export default companyRouter;