import { Router } from 'express'

import { auth } from '../../middlewares/auth.middleware.js'
import {
    addJob,
    applyToJob,
    deleteJob,
    filterJobs,
    getAllJobs,
    getSpecificCompany,
    updateJob
} from './jobs.controllers.js';
import { checkJobOwner } from './job.middlewares.js';
import { validate } from 'uuid';
import { addJobSchema, applyToJobSchema } from './jobs.validations.js';


const jobRouter = Router();

jobRouter.route('/')
    .post(auth('Company_HR'), validate(addJobSchema), addJob)
    .get(auth(['User', 'Company_HR']), getAllJobs)



jobRouter.route('/:jobId')
    .put(auth('Company_HR'), checkJobOwner, validate(addJobSchema), updateJob)
    .delete(auth('Company_HR'), checkJobOwner, deleteJob)

jobRouter.get('/specificCompany', auth(['User', 'Company_HR']), getSpecificCompany)
jobRouter.get('/filterJobs', auth(['User', 'Company_HR']), filterJobs)

jobRouter.post('/apply', auth(['User']), validate(applyToJobSchema), applyToJob)
export default jobRouter;   