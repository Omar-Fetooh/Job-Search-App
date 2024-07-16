import Joi from "joi";

export const addJobSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().required(),
    workingTime: Joi.string().required(),
    seniorityLevel: Joi.string().required(),
    technicalSkills: Joi.string().required(),
    softSkills: Joi.string().required(),
    addedBy: Joi.string().required()
})

export const applyToJobSchema = Joi.object({
    jobId: Joi.string().required(),
    userId: Joi.string().required(),
    userTechnicalSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    userResume: Joi.string()
})