import Customer from '../model/customer.model.js';
import Company from '../model/company.model.js';
import Invoice from '../model/invoice.model.js';
import Product from '../model/product.model.js';


class InvoiceController {

    // CREATE INVOICE Take much db calls on product finding
    async createInvoice(req, res) {
        try {

            const {
                company,
                customer,
                items,
                Discount = 0,
                Notes,
                DueDate
            } = req.body;

            // Company Verify
            const companyExists = await Company.findOne({
                _id: company,
                user: req.user.userId
            });

            if (!companyExists) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found"
                });
            }

            // Customer Verify
            const customerExists = await Customer.findOne({
                _id: customer,
                company
            });

            if (!customerExists) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            let invoiceItems = [];

            let totalTaxableAmount = 0;
            let totalGSTAmount = 0;

            for (const item of items) {

                const product = await Product.findOne({
                    _id: item.product,
                    company
                });

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        message: `Product not found`
                    });
                }

                const taxableAmount =
                    item.Quantity * product.SalePrice;

                const gstAmount =
                    (taxableAmount * product.GSTPercent) / 100;

                const totalAmount =
                    taxableAmount + gstAmount;

                totalTaxableAmount += taxableAmount;
                totalGSTAmount += gstAmount;

                invoiceItems.push({
                    product: product._id,
                    ProductName: product.ProductName,
                    HSNCode: product.HSNCode,
                    Quantity: item.Quantity,
                    Rate: product.SalePrice,
                    GSTPercent: product.GSTPercent,
                    TaxableAmount: taxableAmount,
                    GSTAmount: gstAmount,
                    TotalAmount: totalAmount
                });
            }

            const invoiceCount =
                await Invoice.countDocuments({
                    company
                });

            const invoiceNumber =
                `INV-${invoiceCount + 1}`;

            const grandTotal =
                totalTaxableAmount +
                totalGSTAmount -
                Discount;

            const invoice = await Invoice.create({
                company,
                customer,

                InvoiceNumber: invoiceNumber,

                InvoiceDate: new Date(),

                DueDate,

                items: invoiceItems,

                TotalTaxableAmount: totalTaxableAmount,

                CGST: totalGSTAmount / 2,

                SGST: totalGSTAmount / 2,

                IGST: 0,

                Discount,

                GrandTotal: grandTotal,

                Notes,

                user: req.user.userId
            });

            return res.status(201).json({
                success: true,
                data: invoice
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    // Create Invoice where you avoid to much db calls on finding product.
    async createInvoiceOptimize(req, res) {
        try {

            const {
                company,
                customer,
                items,
                Discount = 0,
                Notes,
                DueDate
            } = req.body;

            // =========================
            // Validate Request
            // =========================

            if (!company || !customer) {
                return res.status(400).json({
                    success: false,
                    message: "Company and Customer are required"
                });
            }

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "At least one item is required"
                });
            }

            // =========================
            // Verify Company
            // =========================

            const companyExists = await Company.findOne({
                _id: company,
                user: req.user.userId
            });

            if (!companyExists) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found"
                });
            }

            // =========================
            // Verify Customer
            // =========================

            const customerExists = await Customer.findOne({
                _id: customer,
                company: company
            });

            if (!customerExists) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            // =========================
            // Fetch All Products
            // =========================

            const productIds = items.map(
                item => item.product
            );

            const products = await Product.find({
                _id: { $in: productIds },
                company: company
            });

            const productMap = {};

            products.forEach(product => {
                productMap[
                    product._id.toString()
                ] = product;
            });

            // =========================
            // Invoice Calculations
            // =========================

            let invoiceItems = [];

            let totalTaxableAmount = 0;
            let totalGSTAmount = 0;

            for (const item of items) {

                const product =
                    productMap[item.product];

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        message: `Product not found : ${item.product}`
                    });
                }

                const quantity =
                    Number(item.Quantity);

                const taxableAmount =
                    quantity *
                    product.SalePrice;

                const gstAmount =
                    (taxableAmount *
                        product.GSTPercent) / 100;

                const totalAmount =
                    taxableAmount +
                    gstAmount;

                totalTaxableAmount +=
                    taxableAmount;

                totalGSTAmount +=
                    gstAmount;

                invoiceItems.push({
                    product: product._id,

                    ProductName:
                        product.ProductName,

                    HSNCode:
                        product.HSNCode,

                    Quantity:
                        quantity,

                    Rate:
                        product.SalePrice,

                    GSTPercent:
                        product.GSTPercent,

                    TaxableAmount:
                        taxableAmount,

                    GSTAmount:
                        gstAmount,

                    TotalAmount:
                        totalAmount
                });
            }

            // =========================
            // Generate Invoice Number
            // =========================

            const invoiceCount =
                await Invoice.countDocuments({
                    company
                });

            const invoiceNumber =
                `INV-${invoiceCount + 1}`;

            // =========================
            // GST Calculation
            // =========================

            const CGST =
                totalGSTAmount / 2;

            const SGST =
                totalGSTAmount / 2;

            const IGST = 0;

            // =========================
            // Grand Total
            // =========================

            const grandTotal =
                totalTaxableAmount +
                totalGSTAmount -
                Discount;

            // =========================
            // Create Invoice
            // =========================

            const invoice =
                await Invoice.create({

                    company,

                    customer,

                    InvoiceNumber:
                        invoiceNumber,

                    InvoiceDate:
                        new Date(),

                    DueDate,

                    items:
                        invoiceItems,

                    TotalTaxableAmount:
                        totalTaxableAmount,

                    CGST,

                    SGST,

                    IGST,

                    Discount,

                    GrandTotal:
                        grandTotal,

                    Notes,

                    user:
                        req.user.userId
                });

            return res.status(201).json({
                success: true,
                message:
                    "Invoice created successfully",
                data: invoice
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    // GET ALL INVOICES
    async getInvoices(req, res) {
        try {

            const invoices = await Invoice.find({
                user: req.user.userId
            })
                .populate("company", "CompanyName")
                .populate("customer", "CustomerName")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: invoices.length,
                data: invoices
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    // GET INVOICE BY ID
    async getInvoiceById(req, res) {
        try {

            const { id } = req.params;

            const invoice = await Invoice.findOne({
                _id: id,
                user: req.user.userId
            })
                .populate("company")
                .populate("customer")
                .populate("items.product");

            if (!invoice) {
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: invoice
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    // UPDATE STATUS
    async updateInvoicePaymentStatus(req, res) {
        try {

            const { id } = req.params;
            const { Status } = req.body;

            const invoice = await Invoice.findOne({
                _id: id,
                user: req.user.userId
            });

            if (!invoice) {
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found"
                });
            }

            invoice.Status = Status;

            await invoice.save();

            return res.status(200).json({
                success: true,
                message: "Invoice status updated",
                data: invoice
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    // Edit or Update Invoice
    // UPDATE FULL INVOICE (Items, Quantities, Prices, etc.)
    async updateInvoice(req, res) {
        try {
            const { id } = req.params;
            const { items, Discount = 0, Notes, DueDate } = req.body;

            // 1. Check karo ki invoice exist karta hai aur usi user ka hai
            const invoice = await Invoice.findOne({ _id: id, user: req.user.userId });
            if (!invoice) {
                return res.status(404).json({ success: false, message: "Invoice not found" });
            }

            // 2. Agar items bheje hain toh poori calculation dobara hogi
            let invoiceItems = [];
            let totalTaxableAmount = 0;
            let totalGSTAmount = 0;

            if (items && items.length > 0) {
                for (const item of items) {
                    const product = await Product.findOne({ _id: item.product, company: invoice.company });
                    if (!product) {
                        return res.status(404).json({ success: false, message: `Product not found` });
                    }

                    const taxableAmount = item.Quantity * product.SalePrice;
                    const gstAmount = (taxableAmount * product.GSTPercent) / 100;
                    const totalAmount = taxableAmount + gstAmount;

                    totalTaxableAmount += taxableAmount;
                    totalGSTAmount += gstAmount;

                    invoiceItems.push({
                        product: product._id,
                        ProductName: product.ProductName,
                        HSNCode: product.HSNCode,
                        Quantity: item.Quantity,
                        Rate: product.SalePrice,
                        GSTPercent: product.GSTPercent,
                        TaxableAmount: taxableAmount,
                        GSTAmount: gstAmount,
                        TotalAmount: totalAmount
                    });
                }

                // Database values ko naye calculation se update karo
                invoice.items = invoiceItems;
                invoice.TotalTaxableAmount = totalTaxableAmount;
                invoice.CGST = totalGSTAmount / 2;
                invoice.SGST = totalGSTAmount / 2;
                invoice.GrandTotal = totalTaxableAmount + totalGSTAmount - Discount;
            }

            // 3. Baki fields jo direct update ho sakti hain
            if (Discount !== undefined) invoice.Discount = Discount;
            if (Notes !== undefined) invoice.Notes = Notes;
            if (DueDate !== undefined) invoice.DueDate = DueDate;

            // 4. Save updates
            await invoice.save();

            return res.status(200).json({
                success: true,
                message: "Invoice updated successfully",
                data: invoice
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }


    // DELETE INVOICE
    async deleteInvoice(req, res) {
        try {

            const { id } = req.params;

            const invoice = await Invoice.findOne({
                _id: id,
                user: req.user.userId
            });

            if (!invoice) {
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found"
                });
            }

            await invoice.deleteOne();

            return res.status(200).json({
                success: true,
                message: "Invoice deleted successfully"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}

export default InvoiceController;