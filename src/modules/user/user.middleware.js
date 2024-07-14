import User from "../../../database/models/user.model.js";

const userMiddleware = async (req, res, next) => {
    const account = await User.findOne()
}