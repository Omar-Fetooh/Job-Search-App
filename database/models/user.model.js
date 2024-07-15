import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    recoveryEmail: {
        type: String,
        unique: false,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    passwordResetOtp: String,
    passwordResetExpires: Date
},
    {
        versionKey: false,
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema)

export default User