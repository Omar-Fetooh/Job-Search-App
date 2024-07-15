import mongoose from "mongoose";
import { AppError, catchAsyncError } from "../../utils/error.js";
import Company from "../../../database/models/company.model.js";

export const companyMiddleware = catchAsyncError(async (req, res, next) => {
    const passedCompanyId = new mongoose.Types.ObjectId(req.params.companyId)
    const company = await Company.findById(passedCompanyId);

    if (company.companyHR.toString() !== req.user.id)   // Comparing (the passedCompany's HRid) vs (id coming from token)
        throw new AppError("Sorry ,you are not the owner of this company")

    next()
})
