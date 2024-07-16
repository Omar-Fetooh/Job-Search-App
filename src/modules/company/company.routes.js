import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import {
    addCompany,
    deleteCompany,
    getAllApplications,
    getCompanyById,
    SearchCompanyByName,
    updateCompany
} from './company.controllers.js';
import { companyMiddleware } from './company.middleware.js';
import { checkJobOwner } from '../jobs/job.middlewares.js';
import { validate } from 'uuid';
import { addCompanySchema } from './company.validations.js';

const companyRouter = Router();

companyRouter.route('/')
    .post(auth('Company_HR'), validate(addCompanySchema), addCompany)  // only HR can add a company
    .get(auth(['Company_HR', 'User']), SearchCompanyByName)  // name will be passed in query 


companyRouter.route('/:companyId')
    .put(auth('Company_HR'), validate(addCompanySchema), companyMiddleware, updateCompany)
    .delete(auth('Company_HR'), companyMiddleware, deleteCompany)
    .get(auth('Company_HR'), getCompanyById)

companyRouter.get('/:jobId/getApplications', auth('Company_HR'), checkJobOwner, getAllApplications)

export default companyRouter;