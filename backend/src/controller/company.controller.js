import Company from "../model/company.model.js";

class CompanyController {

    async createCompany(req, res) {
        try {
            const { CompanyName, GSTIN } = req.body;

            // GSTIN aaya hai tabhi check karo
            if (GSTIN) {
                const existingCompany = await Company.findOne({
                    GSTIN: GSTIN.toUpperCase()
                });

                if (existingCompany) {
                    return res.status(400).json({
                        success: false,
                        message: "GSTIN already exists"
                    });
                }
            }

            const company = await Company.create({
                ...req.body,
                GSTIN: GSTIN?.toUpperCase(),
                user: req.user.userId
            });

            return res.status(201).json({
                success: true,
                data: company
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCompanies(req, res) {
        try {
            const {user}=req;
            const companies = await Company.find({
                user: user.userId
            }).sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: companies.length,
                data: companies
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async updateCompany(req, res) {
        try {

            const { id } = req.params;

            const company = await Company.findOne({
                _id: id,
                user: req.user.userId
            });

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found"
                });
            }

            // GSTIN already exists -> update not allowed
            if (company.GSTIN && req.body.GSTIN) {

                if (
                    company.GSTIN.toUpperCase() !==
                    req.body.GSTIN.toUpperCase()
                ) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "GSTIN cannot be changed once saved"
                    });
                }
            }

            // GSTIN first time save
            if (!company.GSTIN && req.body.GSTIN) {

                const existingGSTIN =
                    await Company.findOne({
                        GSTIN: req.body.GSTIN.toUpperCase(),
                        _id: { $ne: id }
                    });

                if (existingGSTIN) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "GSTIN already exists"
                    });
                }

                company.GSTIN =
                    req.body.GSTIN.toUpperCase();
            }

            company.CompanyName =
                req.body.CompanyName ??
                company.CompanyName;

            company.Pan =
                req.body.Pan ??
                company.Pan;

            company.Address =
                req.body.Address ??
                company.Address;

            company.State =
                req.body.State ??
                company.State;

            company.email =
                req.body.email ??
                company.email;

            company.Mobile =
                req.body.Mobile ??
                company.Mobile;

            await company.save();

            return res.status(200).json({
                success: true,
                message:
                    "Company updated successfully",
                data: company
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async deleteCompany(req, res) {
        try {

            const { id } = req.params;

            const company = await Company.findOne({
                _id: id,
                user: req.user.userId
            });

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found"
                });
            }
            const companyData=company;
            await company.deleteOne();

            return res.status(200).json({
                success: true,
                message:
                    "Company deleted successfully",
                    data:companyData
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default CompanyController;