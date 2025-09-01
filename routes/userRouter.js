import { Router } from "express";
import { createUser, getUserProfile, loginUser } from "../controllers/userController.js";
import { validateLogin } from "../middlewares/userMiddlewares.js";
import { authMiddleWare } from "../middlewares/auth.js";

const router = Router()

router.route('/login').post(validateLogin, loginUser)
router.route('/register').post(createUser)
router.route('/profile').get(authMiddleWare, getUserProfile)



export default router