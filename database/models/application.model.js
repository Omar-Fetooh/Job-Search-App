import mongoose from 'mongoose'

const applicationSchema = mongoose.Schema({
    jobId: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    userTechnicalSkills: {
        type: [String],
        required: true
    },
    userSoftSkills: {
        type: [String],
        required: true
    },
    userResume: {
        type: String,
        required: true
    }
},
    {
        versoinKey: false,
        timestamp: true
    })

const Application = mongoose.model('application', applicationSchema)
export default Application