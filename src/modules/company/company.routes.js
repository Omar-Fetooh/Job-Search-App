import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import {
    addCompany,
    deleteCompany,
    getCompanyById,
    SearchCompanyByName,
    updateCompany
} from './company.controllers.js';
import { companyMiddleware } from './company.middleware.js';


const companyRouter = Router();

companyRouter.route('/')
    .post(auth('Company_HR'), addCompany)  // only HR can add a company
    .get(auth('Company_HR'), SearchCompanyByName)  // name will be passed in query 
    .get(auth('User'), SearchCompanyByName)  // name will be passed in query 

companyRouter.route('/:companyId')
    .put(auth('Company_HR'), companyMiddleware, updateCompany)
    .delete(auth('Company_HR'), companyMiddleware, deleteCompany)
    .get(auth('Company_HR'), getCompanyById)



export default companyRouter;