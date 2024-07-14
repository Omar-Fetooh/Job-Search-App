import mongoose from 'mongoose'

const jobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        enum: ["onsite", "remotely", "hybrid"],
        required: true
    },
    workingTime: {
        type: String,
        enum: ["part-time", "full-time"],
        required: true
    },
    seniorityLevel: {
        type: String,
        enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    technicalSkills: {
        type: [String],
        required: true
    },
    softSkills: {
        type: [String],
        required: true
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
    {
        versoinKey: false,
        timestamp: true
    })

const Job = mongoose.model('job', jobSchema)

export default Job