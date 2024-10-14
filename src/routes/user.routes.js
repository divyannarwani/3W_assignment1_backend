import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createUser, getData } from "../controllers/user.controller.js";
import { adminLogin } from "../middlewares/adminLogin.js";


const router = Router()

router.route("/senddata").post(upload, createUser)
router.route("/dashboard").get(adminLogin, getData)

export default router;