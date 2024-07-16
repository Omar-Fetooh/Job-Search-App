import Job from "../../../database/models/job.model.js";
import { AppError, catchAsyncError } from "../../utils/error.js";

export const checkJobOwner = catchAsyncError(async (req, res, next) => {
    const job = await Job.findById(req.params.jobId);

    if (job.addedBy.toString() !== req.user.id)
        throw new AppError("Sorry , You are not the HR of this job")

    next()
})