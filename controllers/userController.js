import jwt from "jsonwebtoken";
import { statusCodes } from "../helpers/userHelpers.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { sendSuccess } from "../middlewares/errorMiddleware.js";
import { createUserService, getuserDetailsWithIdService, loginUserService } from "../services/userService.js";
import bcrypt from "bcryptjs";

export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    console.log(email, password);

    const user = await loginUserService(req.body)

    const data = {
        name: user.name,
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })

    const response = {
        message: "login successful!",
        user,
        token
    }
    sendSuccess(res, response)

})

export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await getuserDetailsWithIdService(req.user.id)

    sendSuccess(res, { user })
})

export const createUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body

        console.log(req.body);

        const newPassword = await bcrypt.hash(password, 12)
        console.log(newPassword);
        req.body.password = newPassword

        const response = await createUserService(req.body)

        console.log(response);

        if (!response.success) {
            const status = statusCodes.find((item) => item.code === 500);
            return res.status(status.code).json({ success: false, message: "user creation failed!", error: response.error })
        }

        const status = statusCodes.find((item) => item.code === 201);
        res.status(status.code).json({ success: true, user: response.user, message: "user created successfully!" })

    } catch (error) {
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: status.message })
    }
}