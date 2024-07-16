import mongoose from 'mongoose'

const applicationSchema = mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: 'job',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
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
        type: String
    }
},
    {
        versoinKey: false,
        timestamp: true
    })

const Application = mongoose.model('application', applicationSchema)
export default Application