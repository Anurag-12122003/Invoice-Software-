import Company from "../model/company.model.js";
import Customer from "../model/customer.model.js";

class CustomerController {


    async createCustomer(req, res) {
        try {

            const {
                company,
                CustomerName,
                GSTIN,
                email
            } = req.body;

            const companyExists =
                await Company.findOne({
                    _id: company,
                    user: req.user.userId
                });

            if (!companyExists) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found"
                });
            }

            if (GSTIN) {
                const existingCustomer =
                    await Customer.findOne({
                        GSTIN: GSTIN.toUpperCase(),
                        company
                    });

                if (existingCustomer) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Customer GSTIN already exists"
                    });
                }
            }
            if (email) {
                const existingCustomer =
                    await Customer.findOne({
                        Email: email.toLowerCase(),
                        company
                    });

                if (existingCustomer) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Customer Email already exists"
                    });
                }
            }

            const customer =
                await Customer.create({
                    ...req.body,
                    GSTIN: GSTIN?.toUpperCase(),
                    Email: email?.toLowerCase(),
                    user: req.user.userId
                });

            return res.status(201).json({
                success: true,
                message: "Customer created Successfully",
                data: customer
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async getCustomers(req, res) {

        try {

            const customers =
                await Customer.find({
                    user: req.user.userId
                })
                    .populate("company", "CompanyName")
                    .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: customers.length,
                data: customers
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async getCustomerById(req, res) {

        try {

            const { id } = req.params;

            const customer =
                await Customer.findOne({
                    _id: id,
                    user: req.user.userId
                })
                    .populate("company");

            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: customer
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async getCustomersByCompany(req, res) {
        try {
            // फ्रंटएंड से URL Query में कंपनी की ID आएगी (e.g., ?companyId=123)
            const { companyId } = req.query;

            if (!companyId) {
                return res.status(400).json({
                    success: false,
                    message: "Company ID is required"
                });
            }

            // सिर्फ उसी कंपनी और उसी यूजर के कस्टमर्स को ढूंढें
            const customers = await Customer.find({
                company: companyId,
                user: req.user.userId
            })
                .populate("company", "CompanyName")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: customers.length,
                data: customers
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCustomer(req, res) {

        try {

            const { id } = req.params;

            const customer =
                await Customer.findOne({
                    _id: id,
                    user: req.user.userId
                });

            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            if (
                customer.GSTIN &&
                req.body.GSTIN &&
                customer.GSTIN !==
                req.body.GSTIN.toUpperCase()
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "GSTIN cannot be changed"
                });

            }

            if (!customer.GSTIN && req.body.GSTIN) {

                const gstExists =
                    await Customer.findOne({
                        GSTIN:
                            req.body.GSTIN.toUpperCase(),
                        company: customer.company,
                        _id: { $ne: id }
                    });

                if (gstExists) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "GSTIN already exists"
                    });
                }

                customer.GSTIN =
                    req.body.GSTIN.toUpperCase();
            }

            customer.CustomerName =
                req.body.CustomerName ??
                customer.CustomerName;

            customer.Email =
                req.body.Email ??
                customer.Email;

            customer.Mobile =
                req.body.Mobile ??
                customer.Mobile;

            customer.Address =
                req.body.Address ??
                customer.Address;

            customer.State =
                req.body.State ??
                customer.State;

            customer.City =
                req.body.City ??
                customer.City;

            customer.Pincode =
                req.body.Pincode ??
                customer.Pincode;

            await customer.save();

            return res.status(200).json({
                success: true,
                message:
                    "Customer updated successfully",
                data: customer
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    async deleteCustomer(req, res) {

        try {

            const { id } = req.params;

            const customer =
                await Customer.findOne({
                    _id: id,
                    user: req.user.userId
                });

            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }
            const delCus = customer;

            await customer.deleteOne();

            return res.status(200).json({
                success: true,
                message:
                    "Customer deleted successfully",
                data: delCus
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}
export default CustomerController;

/* 
const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true,          // यह आपको अपडेटेड डेटा वापस देगा
                runValidators: true // यह एडिट के समय वैलिडेशन चेक करेगा 
            }
        );

    method 2: .save()-> method ka use karna edit and create time to ye validation check karta hai.
*/