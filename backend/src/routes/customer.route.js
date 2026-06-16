import express from 'express';
import CustomerController from '../controller/customer.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const customerRouter=express.Router();
const customerController=new CustomerController();

customerRouter.post('/create-customer',protect,customerController.createCustomer);
customerRouter.get('/get-customer',protect,customerController.getCustomers);
customerRouter.patch('/update-customer/:id',protect,customerController.updateCustomer);
customerRouter.delete('/delete-customer/:id',protect,customerController.deleteCustomer);
customerRouter.get('/customers',protect,customerController.getCustomersByCompany);


export default customerRouter;