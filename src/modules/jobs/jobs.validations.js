import Joi, { string } from "joi";
import { updateJob } from "./jobs.controllers";

export const addJobSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().required(),
    workingTime: Joi.string().required(),
    seniorityLevel: Joi.string().required(),
    technicalSkills: Joi.string().required(),
    softSkills: Joi.string().required(),
    addedBy: Joi.string().required()
})

export const updateJobSchema = Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string(),
    workingTime: Joi.string(),
    seniorityLevel: Joi.string(),
    technicalSkills: Joi.string(),
    softSkills: Joi.string(),
    addedBy: Joi.string()
})

export const applyToJobSchema = Joi.object({
    jobId: Joi.string().required(),
    userId: Joi.string().required(),
    userTechnicalSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    userResume: Joi.string()
})