import { Router } from "express";
import { deleteAccount, updateAccount } from "./user.controllers.js";

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

userRouter
    .route('/account')
    .put(auth('user'), updateAccount)
    .delete(auth('user'), deleteAccount)



export default userRouter
