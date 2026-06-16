import Payment from "../model/payment.model.js";
import Invoice from "../model/invoice.model.js";

class PaymentController {

    async createPayment(req, res) {
        try {

            const {
                invoice,
                Amount,
                PaymentMode,
                ReferenceNo,
                Remarks
            } = req.body;

            if (!invoice || !Amount) {
                return res.status(400).json({
                    success: false,
                    message: "Invoice and Amount are required"
                });
            }

            const invoiceExists =
                await Invoice.findOne({
                    _id: invoice,
                    user: req.user.userId
                });

            if (!invoiceExists) {
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found"
                });
            }

            // Total Paid Amount
            const paymentSummary =
                await Payment.aggregate([
                    {
                        $match: {
                            invoice: invoiceExists._id
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalPaid: {
                                $sum: "$Amount"
                            }
                        }
                    }
                ]);

            const alreadyPaid =
                paymentSummary[0]?.totalPaid || 0;

            const newTotalPaid =
                alreadyPaid + Number(Amount);

            if (
                newTotalPaid >
                invoiceExists.GrandTotal
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Payment exceeds invoice amount"
                });
            }

            const payment =
                await Payment.create({

                    invoice:

                        invoiceExists._id,

                    company:

                        invoiceExists.company,

                    customer:

                        invoiceExists.customer,

                    Amount,

                    PaymentMode,

                    ReferenceNo,

                    Remarks,

                    user:
                        req.user.userId
                });

            // Update Invoice Status

            if (
                newTotalPaid ===
                invoiceExists.GrandTotal
            ) {

                invoiceExists.Status =
                    "Paid";

            } else if (
                newTotalPaid > 0
            ) {

                invoiceExists.Status =
                    "Partially Paid";

            }

            await invoiceExists.save();

            return res.status(201).json({
                success: true,
                message:
                    "Payment created successfully",
                data: payment
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async getPayments(req, res) {
        try {

            const payments =
                await Payment.find({
                    user: req.user.userId
                })
                    .populate(
                        "invoice",
                        "InvoiceNumber GrandTotal Status"
                    )
                    .sort({
                        createdAt: -1
                    });

            return res.status(200).json({
                success: true,
                count: payments.length,
                data: payments
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async getPaymentById(req, res) {
        try {

            const { id } = req.params;

            const payment =
                await Payment.findOne({
                    _id: id,
                    user: req.user.userId
                })
                    .populate("invoice")
                    .populate("company")
                    .populate("customer");

            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Payment not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: payment
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async deletePayment(req, res) {
        try {

            const { id } = req.params;

            const payment =
                await Payment.findOne({
                    _id: id,
                    user: req.user.userId
                });

            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Payment not found"
                });
            }

            const invoice =
                await Invoice.findById(
                    payment.invoice
                );

            await payment.deleteOne();

            // Recalculate Payment Status

            const paymentSummary =
                await Payment.aggregate([
                    {
                        $match: {
                            invoice:
                                invoice._id
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalPaid: {
                                $sum: "$Amount"
                            }
                        }
                    }
                ]);

            const totalPaid =
                paymentSummary[0]?.totalPaid || 0;

            if (totalPaid === 0) {

                invoice.Status =
                    "Pending";

            } else if (
                totalPaid <
                invoice.GrandTotal
            ) {

                invoice.Status =
                    "Partially Paid";

            } else {

                invoice.Status =
                    "Paid";
            }

            await invoice.save();

            return res.status(200).json({
                success: true,
                message:
                    "Payment deleted successfully"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}

export default PaymentController;