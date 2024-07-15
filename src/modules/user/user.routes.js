import { Router } from "express";
import { deleteAccount, getUserAccountData, updateAccount } from "./user.controllers.js";
import userMiddleware from "./user.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

userRouter
    .route('/account')
    .get(auth('user'), getProfileData)  // Usesr Id will be Passed in query


userRouter.route('/:userId')
    .put(auth('user'), userMiddleware, updateAccount)
    .delete(auth('user'), userMiddleware, deleteAccount)
    .get(auth('user'), userMiddleware, getUserAccountData)
userRouter

export default userRouter
