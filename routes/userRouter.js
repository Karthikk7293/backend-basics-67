import { Router } from "express";
import { createUser, getUserProfile, loginUser, updateUserRole } from "../controllers/userController.js";
import { validateLogin } from "../middlewares/userMiddlewares.js";
import { authMiddleWare, roleAuthorize } from "../middlewares/auth.js";

const router = Router()

router.route('/login').post(validateLogin, loginUser)
router.route('/register').post(createUser)
router.route('/profile').get(authMiddleWare, getUserProfile)
router.route('/update-role').patch(authMiddleWare, roleAuthorize(['admin', 'payment manager', 'user']), updateUserRole)



export default router