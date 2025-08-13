import { statusCodes } from "../helpers/userHelpers.js";

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        const status = statusCodes.find((item) => item.code === 400);
        return res.status(status.code).json({ success: false, message: "Email is required" })

    }
    if (!password) {
        const status = statusCodes.find((item) => item.code === 400);
        return res.status(status.code).json({ success: false, message: "Password is required" })
    }
    next();

}