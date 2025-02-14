import { Router } from "express";


import {getAllJobs, PostJob} from '../controllers/job.controller.js'

import { authorizeAlumni, verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();



  router.route('/jobposting').post(verifyJWT , authorizeAlumni ,PostJob)
  router.route('/allJobs').get(getAllJobs)
  

export default router