import { Router } from "express";
import {
    deleteAccount, getAllAccsOfRecovEmail, getProfileData, getUserAccountData,
    requestResetPassword, resetPassword,
    signin, signup, updateAccount,
    updatePassword,
} from "./user.controllers.js";

import userMiddleware from "./user.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";
import upload from "../../utils/upload.js";

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

userRouter
    .route('/account')
    .get(auth('User'), getProfileData)  // Usesr Id will be Passed in query


userRouter.route('/:userId')
    .put(auth('User'), userMiddleware, updateAccount)
    .delete(auth('User'), userMiddleware, deleteAccount)
    .get(auth('User'), userMiddleware, getUserAccountData)


userRouter.put('/account/:userId', auth('User'), userMiddleware, updatePassword)

userRouter.post('/requestResetPassword', requestResetPassword)
userRouter.post('/resetPassword', resetPassword)

userRouter.get('/getAllAccsOfRecovEmail/:recoveryEmail', getAllAccsOfRecovEmail)


export default userRouter
