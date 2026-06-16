import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import InvoiceController from '../controller/invoice.controller.js';

const invoiceRouter = express.Router();
const invoiceController = new InvoiceController();

invoiceRouter.post("/create-invoice",protect,invoiceController.createInvoiceOptimize);

invoiceRouter.get("/invoices",protect,invoiceController.getInvoices);

invoiceRouter.get("/invoice/:id",protect,invoiceController.getInvoiceById);

invoiceRouter.patch("/update-invoice-status/:id",protect,invoiceController.updateInvoicePaymentStatus);

invoiceRouter.patch("/edit-invoice/:id",protect,invoiceController.updateInvoice);

invoiceRouter.delete("/delete-invoice/:id",protect,invoiceController.deleteInvoice);

export default invoiceRouter;