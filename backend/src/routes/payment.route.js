import express from 'express';
import PaymentController from '../controller/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validateObjectId } from '../middleware/validate.middleware.js';

const paymentRouter=express.Router();

const paymentController=new PaymentController();

paymentRouter.get('/payments',protect,validateObjectId,paymentController.getPayments);
paymentRouter.get('/payment/:id',protect,validateObjectId,paymentController.getPaymentById);
paymentRouter.post('/create-payment',protect,validateObjectId,paymentController.createPayment);
paymentRouter.delete('/delete-payment',protect,validateObjectId,paymentController.deletePayment);

export default paymentRouter;
