import { Router } from "express";
import { sendPayment, getPayments } from "../controllers/payment.controller.js";

// import {getAllJobs, PostJob} from '../controllers/job.controller.js'

import { authorizeAlumni, verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

router.route('/sendpayment').post(verifyJWT,sendPayment)
router.route('/getpayment').get(verifyJWT,getPayments)


export default router