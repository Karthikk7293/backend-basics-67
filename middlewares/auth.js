import jwt from "jsonwebtoken";
import { NotFoundError, sendError } from "./errorMiddleware.js";

// Middleware to authenticate user using JWT token
export const authMiddleWare = async (req, res, next) => {
    try {
        // Get the 'Authorization' header
        const token = req.headers['authorization'];

        // Extract token value from 'Bearer <token>'
        const tokenValue = token.split(" ")[1]

        // If token is missing, throw error
        if (!tokenValue) {
            throw new NotFoundError("token not found")
        }

        // Verify the token using the secret key
        jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
            console.log(err); // Log verification errors (if any)

            if (err) {
                return sendError(res, "invalid token", 403) // Send error if token invalid
            }

            console.log(user); // Log user info from token

            // Attach user info to request for next middleware
            req.user = user;
        })

        next() // Proceed to the next middleware/route handler

    } catch (error) {
        // Handle errors and send response
        sendError(res, error.message)
    }
}

// Middleware to authorize user based on role
export const roleAuthorize = (roles = []) => {
    return (req, res, next) => {

        // Check if user's role is allowed
        if (!roles.includes(req.user.role)) {
            return sendError(res, "access denied", 403) // Deny access if role not allowed
        }

        next() // Proceed if role is authorized
    }
}
