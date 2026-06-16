import Company from "../model/company.model.js";
import Product from "../model/product.model.js";
import Customer from "../model/customer.model.js";
import Invoice from "../model/invoice.model.js";
import Payment from "../model/payment.model.js";

class DashboardController {

    async getDashboard(req, res) {
        try {

            const userId = req.user.userId;

            const [
                totalCompanies,
                totalCustomers,
                totalProducts,
                totalInvoices,
                paidInvoices,
                pendingInvoices
            ] = await Promise.all([

                Company.countDocuments({
                    user: userId
                }),

                Customer.countDocuments({
                    user: userId
                }),

                Product.countDocuments({
                    user: userId
                }),

                Invoice.countDocuments({
                    user: userId
                }),

                Invoice.countDocuments({
                    user: userId,
                    Status: "Paid"
                }),

                Invoice.countDocuments({
                    user: userId,
                    Status: {
                        $in: [
                            "Pending",
                            "Partially Paid"
                        ]
                    }
                })
            ]);

            // Revenue
            const revenueData =
                await Payment.aggregate([
                    {
                        $match: {
                            user: req.user.userId
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: {
                                $sum: "$Amount"
                            }
                        }
                    }
                ]);

            const totalRevenue =
                revenueData[0]?.totalRevenue || 0;

            // Invoice Total
            const invoiceTotalData =
                await Invoice.aggregate([
                    {
                        $match: {
                            user: req.user.userId
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalInvoiceAmount: {
                                $sum: "$GrandTotal"
                            }
                        }
                    }
                ]);

            const totalInvoiceAmount =
                invoiceTotalData[0]?.totalInvoiceAmount || 0;

            const outstandingAmount =
                totalInvoiceAmount -
                totalRevenue;

            return res.status(200).json({
                success: true,
                data: {
                    totalCompanies,
                    totalCustomers,
                    totalProducts,
                    totalInvoices,
                    paidInvoices,
                    pendingInvoices,
                    totalRevenue,
                    outstandingAmount
                }
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}

export default DashboardController;