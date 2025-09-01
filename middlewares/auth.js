import jwt from "jsonwebtoken";
import { NotFoundError, sendError } from "./errorMiddleware.js";

export const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        const tokenValue = token.split(" ")[1]

        if (!tokenValue) {
            throw new NotFoundError("token not found")
        }

        jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {

            console.log(err);

            if (err) {
                return sendError(res, "invalid token", 403)
            }
            console.log(user);

            req.user = user;
        })

        next()

    } catch (error) {

        sendError(res, error.message)
    }
}