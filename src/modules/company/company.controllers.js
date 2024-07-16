import mongoose from "mongoose";
import Company from "../../../database/models/company.model.js";
import { AppError, catchAsyncError } from "../../utils/error.js";
import Job from "../../../database/models/job.model.js";
import Application from '../../../database/models/application.model.js'
export const addCompany = catchAsyncError(async (req, res, next) => {
    const data = await Company.create(req.body);
    res.status(201).json({ message: "Company Added Successfully", data })
})

export const updateCompany = catchAsyncError(async (req, res) => {
    const { companyName, companyEmail } = req.body;

    const companyId = new mongoose.Types.ObjectId(req.params.companyId);

    const duplicateName = await Company.findOne({ companyName, _id: { $ne: companyId } })
    if (duplicateName) throw new AppError('Sorry, Name Already Taken', 409)

    const duplicateEmail = await Company.findOne({ companyEmail, _id: { $ne: companyId } })
    if (duplicateEmail) throw new AppError('Sorry, Email Already Taken', 409)

    await Company.updateOne({ _id: companyId }, req.body);
    res.status(201).json({ message: "Company Updated Successfully" })
})

export const deleteCompany = catchAsyncError(async (req, res) => {
    await Company.findByIdAndDelete(req.params.companyId)
    res.status(201).json({ message: "Company Deleted Successfully" })
})

export const getCompanyById = catchAsyncError(async (req, res) => {
    const company = await Company.findById(req.params.companyId)

    const HrId = company.companyHR  // ObjectID
    const jobs = await Job.find({ addedBy: HrId })  // find all jobs added by this Hr

    res.json({ message: "Company Fetched Successfully", company, jobs })
})

export const SearchCompanyByName = catchAsyncError(async (req, res) => {
    const { companyName } = req.query
    const company = await Company.findOne({ companyName })

    res.json({ message: "Company Fetched Successfully", company })
})

export const getAllApplications = catchAsyncError(async (req, res) => {

    const applications = await Application.find({ jobId: req.params.jobId })
        .populate('userId', '-firstName -lastName -password -recoveryEmail -DOB -createdAt -updatedAt ');


    res.json({ message: applications })
})