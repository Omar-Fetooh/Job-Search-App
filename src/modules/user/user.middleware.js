import mongoose from "mongoose";
import User from "../../../database/models/user.model.js";
import { AppError, catchAsyncError } from "../../utils/error.js";

const userMiddleware = catchAsyncError(async (req, res, next) => {
    const passedId = new mongoose.Types.ObjectId(req.params.userId); // converted to objectID
    const account = await User.findById(passedId);
    // console.log(account._id.toString())
    // console.log(req.user.id)
    if (account._id.toString() !== req.user.id)
        throw new AppError("Sorry ,you don't own this account", 403)

    next();
})

export default userMiddleware