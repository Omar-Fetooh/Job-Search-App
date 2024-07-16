import Joi from 'joi'

export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.string().required(),
    recoveryEmail: Joi.string().required(),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string().required(),
    role: Joi.string()
})

export const signinSchema = Joi.object({
    email: Joi.email().required(),
    password: Joi.string().required()
})

export const updateAccountSchema = Joi.object({
    email: Joi.email(),
    mobileNumber: Joi.string(),
    recoveryEmail: Joi.string(),
    DOB: Joi.date(),
    lastName: Joi.string(),
    firstName: Joi.string()
})

export const requestResetPasswordSchema = Joi.object({
    email: Joi.email().required()
})

export const resetPasswordSchema = Joi.object({
    email: Joi.email().required(),
    otp: Joi.string().required(),
    newPassword: Joi.string().required()
})

export const updatePasswordSchmea = Joi.object({
    email: Joi.email().required(),
    password: Joi.string().required()
})