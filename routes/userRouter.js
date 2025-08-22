import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { validateLogin } from "../middlewares/userMiddlewares.js";

const router = Router()

router.route('/login').post(validateLogin, loginUser)
router.route('/register').post(createUser)
// router.route('/profile').get()



export default router