import express from 'express';
import ProductController from '../controller/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const productRouter=express.Router();
const productController= new ProductController();

productRouter.get('/products',protect,productController.getProductsByCompany);
productRouter.get('/product/:id',protect,productController.getProductById);
productRouter.post('/create-product',protect,productController.createProduct);
productRouter.patch('/delete-product/:id',protect,productController.deleteProduct);
productRouter.patch('/update-product/:id',protect,productController.updateProduct);



export default productRouter;