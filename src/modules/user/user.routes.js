import { Router } from "express";
import {
    deleteAccount, getAllAccsOfRecovEmail,
    getProfileData, getUserAccountData,
    requestResetPassword, resetPassword,
    signin, signup,
    updateAccount, updatePassword,
} from "./user.controllers.js";

import userMiddleware from "./user.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";
import upload from "../../utils/upload.js";
import validate from '../../middlewares/validate.middleware.js'
import {
    resetPasswordSchema,
    signinSchema,
    signupSchema,
    updateAccountSchema,
    updatePasswordSchmea
} from "./user.validations.js";

const userRouter = Router();

userRouter.post('/signup', validate(signupSchema), signup)
userRouter.post('/signin', validate(signinSchema), signin)

userRouter
    .route('/account')
    .get(auth('User'), getProfileData)  // Usesr Id will be Passed in query


userRouter.route('/:userId')
    .put(auth('User'), validate(updateAccountSchema), userMiddleware, updateAccount)
    .delete(auth('User'), userMiddleware, deleteAccount)
    .get(auth('User'), userMiddleware, getUserAccountData)


userRouter.put('/account/:userId', auth('User'), userMiddleware, updatePassword)

userRouter.post('/requestResetPassword', validate(updatePasswordSchmea), requestResetPassword)
userRouter.post('/resetPassword', validate(resetPasswordSchema), resetPassword)

userRouter.get('/getAllAccsOfRecovEmail/:recoveryEmail', getAllAccsOfRecovEmail)


export default userRouter
