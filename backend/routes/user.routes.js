import { Router } from "express";

import { userRegistration ,
    Login,
    Logout,
    getCurrentUser,
    updateUserDetail,
  
} from "../controllers/user.controller.js";
import {getAllJobs, PostJob} from '../controllers/job.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeAlumni, verifyJWT } from "../middlewares/auth.middleware.js";
import {User} from '../models/user.model.js';


const router = Router();


router.route("/register").post(upload.single("avatar"),userRegistration)
    router.route('/login').post(Login)
    router.route('/logout').post(verifyJWT , Logout)
  router.route('/getCurrentUser').get(verifyJWT , getCurrentUser)
  router.route('/updateUserDetail').put(verifyJWT , updateUserDetail)
  router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude password for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  

export default router