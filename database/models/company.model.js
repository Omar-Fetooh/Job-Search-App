import mongoose from 'mongoose'

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: [Number],
        validate: {
            validator: (value) => {
                const validRanges = [
                    [1, 10],
                    [11, 50],
                    [51, 100],
                    [101, 500],
                    [501, 1000]
                ]
                return validRanges.some(range => value[0] === range[0] && value[1] === range[1])
            },
            message: props => `${props.value} is not within the allowed ranges of employees!`
        }
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
    },
    companyHR:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

const Company = mongoose.model('company', companySchema)

export default Company