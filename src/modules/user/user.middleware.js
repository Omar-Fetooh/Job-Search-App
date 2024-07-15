import User from "../../../database/models/user.model.js";
import { AppError } from "../../utils/error.js";

const userMiddleware = async (req, res, next) => {
    const account = await User.findOne(req.params.userId);
    if (account.userId.toString() !== req.user.id)
        throw new AppError("Sorry ,you don't own this account", 400)

    next();
}

export default userMiddleware