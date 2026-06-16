import Company from "../model/company.model.js";
import Product from "../model/product.model.js";

class ProductController {

    async createProduct(req, res) {
        try {
            const { company, ProductName, SalePrice } = req.body;

            const companyExists = await Company.findOne({ _id: company, user: req.user.userId });
            if (!companyExists) {
                return res.status(404).json({ success: false, message: "Company not found or unauthorized" });
            }
            const product = await Product.create({
                ...req.body,
                user: req.user.userId // टोकन से यूजर आईडी जोड़ी
            });

            return res.status(201).json({ success: true, data: product, message: "company created Successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async getProductsByCompany(req, res) {
        try {
            const { companyId } = req.query;
            if (!companyId) {
                return res.status(400).json({
                    success: false,
                    message: "company id is required"

                })
            }
            const products = await Product.find({
                company: companyId,
                user: req.user.userId,
                Status: true
            }).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, count: products.length, data: products });

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findOne({ _id: id, user: req.user.userId });
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }

            return res.status(200).json({ success: true, data: product });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id, user: req.user.userId });
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findOne({ _id: id, user: req.user.userId });
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }

            product.Status = false;
            await product.save();

            return res.status(200).json({ success: true, message: "Product deactivated successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default ProductController;

