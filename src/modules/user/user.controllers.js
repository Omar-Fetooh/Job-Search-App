import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { AppError, catchAsyncError } from '../../utils/error.js'
import User from '../../../database/models/user.model.js'

export const signup = catchAsyncError(async (req, res) => {
    const { email, firstName, lastName, password, recoveryEmail, DOB, mobileNumber, role, status } = req.body;

    const user = await User.findOne({ email })
    if (user) throw new AppError('Sorry, but email already Exists', 400)

    const hashedPassword = bcrypt.hashSync(password, 8);

    const username = firstName + lastName;

    const data = await User.create(
        {
            email, firstName, lastName, username, recoveryEmail, DOB, mobileNumber, role, status,
            password: hashedPassword
        }
    )
    res.status(201).json({ message: "User Created Successfully", data })
})

export const signin = catchAsyncError(async (req, res) => {
    const { email, password, recoveryEmail, mobileNumber } = req.body;

    const user = User.findOne({ $or: [{ email }, { recoveryEmail }, { mobileNumber }] })
    if (!user) throw new AppError("Sorry , Invalid Credintails", 400)

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) throw new AppError("Sorry , Invalid Credintails", 400)

    user.status = 'online'
    const token = jwt.sign({
        id: user._id, username: user.username, email: user.email,
        recoveryEmail: user.recoveryEmail, DOB: user.DOB,
        mobileNumber: user.mobileNumber, role: user.role,
        status: user.status
    }, 'secret')

    res.json({ token })
})

export const updateAccount = catchAsyncError(async (req, res) => {

    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body;
    const userId = req.user.id;

    const duplicate = await User.findOne({ $or: [{ email }, { mobileNumber }], _id: { $ne: userId } })
    if (duplicate) throw new AppError("Sorry , but Email or mobile number already exist,try Again", 400)

    const data = await User.findOneAndUpdate(
        { $or: [{ email }, { recoveryEmail }, { mobileNumber }] },  // Conditions
        { email, mobileNumber, recoveryEmail, DOB, lastName, firstName },  // Update
        { new: true }  // Option
    )

    res.status(200).json({ message: "Updated Successfully", data })
})

export const deleteAccount = catchAsyncError(async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete({ userId })
    res.json({ message: "Account Deleted Successfully" })
})

export const getUserAccountData = catchAsyncError(async (req, res) => {
    const { userId } = req.params;
    const data = await User.findById({ userId });
    res.json({ data })
})

export const getProfileData = catchAsyncError(async (req, res) => {
    const { userId } = req.query;
    const allData = await User.findById(userId);
    const { username, email, DOB, mobileNumber, role, status } = allData  // We need only profile data 

    res.json({ message: username, email, DOB, mobileNumber, role, status })

})
export const updatePassword = catchAsyncError(async (req, res) => {


})

export const forgetPassword = catchAsyncError(async (req, res) => {


})

export const getAllAccsOfRecovEmail = catchAsyncError(async (req, res) => {


})