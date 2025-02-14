import { Router } from "express";


import {postProject , getAllProject} from '../controllers/openSource.controller.js'

import { authorizeAlumni, verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();



  router.route('/projectposting').post(verifyJWT , authorizeAlumni ,postProject)
  router.route('/allprojects').get(getAllProject)
  

export default router