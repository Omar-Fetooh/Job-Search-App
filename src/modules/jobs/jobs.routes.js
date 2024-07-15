import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'


const jobRouter = Router();

jobRouter.route('/').post()



export default jobRouter;