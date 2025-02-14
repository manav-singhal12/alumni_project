import { Router } from "express";


import {eventPost , getAllEvents} from '../controllers/event.controller.js'

import { authorizeAlumni, verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();



  router.route('/eventposting').post(verifyJWT , authorizeAlumni ,eventPost)
  router.route('/getEvents').get(getAllEvents)
  

export default router