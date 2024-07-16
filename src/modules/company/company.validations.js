import Joi from "joi";

export const addCompanySchema = Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployess: Joi.array().items(Joi.number()),
    companyEmail: Joi.email().required(),
    companyHR: Joi.string()
})

