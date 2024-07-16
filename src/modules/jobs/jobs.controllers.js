import mongoose from "mongoose";
import Application from "../../../database/models/application.model.js";
import Company from "../../../database/models/company.model.js";
import Job from "../../../database/models/job.model.js";
import User from "../../../database/models/user.model.js";
import { catchAsyncError } from "../../utils/error.js";

export const addJob = catchAsyncError(async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ message: "Job Added Successfully", job })
})

export const updateJob = catchAsyncError(async (req, res) => {
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true })
    res.json({ message: "Job Updated Successfully", job })
})

export const deleteJob = catchAsyncError(async (req, res) => {
    await Job.findByIdAndDelete(req.params.jobId)
    res.json({ message: "Job Deleted Successfully" })
})

export const getAllJobs = catchAsyncError(async (req, res) => {
    const jobs = await Job.find().populate('addedBy', ' -firstName -lastName -password -recoveryEmail -DOB -createdAt -updatedAt');

    const jobsWithCompanyInfo = await Promise.all(jobs.map(async job => {
        const company = await Company.findOne({ companyHR: job.addedBy._id });
        return {
            ...job.toObject(),
            company
        };
    }));

    res.json({ message: jobsWithCompanyInfo })
})

export const getSpecificCompany = catchAsyncError(async (req, res) => {

    const company = await Company.findOne({ companyName: req.query.companyName })
    console.log("IM here")
    const hrId = company.companyHR;

    const allJobs = await Job.find({ addedBy: hrId });

    const companyWithJobs = {
        ...company.toObject(),
        jobs: allJobs
    }
    res.json({ message: companyWithJobs })
})


export const filterJobs = catchAsyncError(async (req, res) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

    const filter = {};
    if (workingTime) filter.workingTime = workingTime;
    if (jobLocation) filter.jobLocation = jobLocation;
    if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
    if (jobTitle) filter.jobTitle = jobTitle;
    if (technicalSkills) filter.technicalSkills = { $in: technicalSkills.split(',') };

    console.log(filter)
    const filteredJobs = await Job.find(filter)
    res.json({ message: filteredJobs })

})

export const applyToJob = catchAsyncError(async (req, res) => {
    const { jobId, userId, userTechnicalSkills, userSoftSkills } = req.body;
    const jobIdObj = new mongoose.Types.ObjectId(jobId)
    const userIdObj = new mongoose.Types.ObjectId(userId)

    // console.log(jobId, userId)

    const application = await Application.create({ jobId: jobIdObj, userId: userIdObj, userTechnicalSkills, userSoftSkills });
    res.status(201).json({ message: "Applied to Job Successfully", application })
})

export const uploadResume = catchAsyncError(async (req, res) => {
    const { userId } = req.params;
    const resumePath = req.file.path

    const user = await User.findByIdAndUpdate(userId, { resumePath }, { new: true });
    if (!user) throw new AppError('User not found');


    res.json({ message: 'Resume uploaded successfully', user });
})