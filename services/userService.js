import { DatabaseError, NotFoundError, ValidationError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Service to create a new user
export const createUserService = async (userDetails) => {
    try {
        // Create a new user instance with provided details
        const user = new User(userDetails)

        // Save the user to the database
        await user.save()

        console.log(user); // Optional: log user for debugging
        return { success: true, user } // Return success with user data

    } catch (error) {
        console.log(error.message); // Log error message
        return { success: false, error: error.message } // Return failure with error message
    }
}

// Service to handle user login
export const loginUserService = async (payload) => {
    const { email, password } = payload;
    try {
        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotFoundError("user not found!") // Error if user doesn't exist
        }

        // Compare provided password with stored hashed password
        const response = await bcrypt.compare(password, user.password)
        if (!response) {
            throw new ValidationError("incorrect password!") // Error if password mismatch
        }

        return { name: user.name, _id: user._id, role: user.role, email: user.email } // Return user if login is successful
    } catch (error) {
        throw new DatabaseError(error.message) // Wrap and throw database error
    }
}

// Service to fetch user details by user ID
export const getuserDetailsWithIdService = async (id) => {
    try {
        // Find user by ID
        const user = await User.findById(id)
        if (!user) {
            throw new NotFoundError("user not found!") // Error if user not found
        }
        return user // Return found user
    } catch (error) {
        throw new DatabaseError(error.message) // Wrap and throw database error
    }
}

// Service to update user's role
export const updateUserRoleService = async (id, role) => {
    try {
        // Find user by ID
        const user = await User.findById(id)
        if (!user) {
            throw new NotFoundError("user not found!") // Error if user not found
        }

        // Update user's role and save changes
        user.role = role;
        await user.save()

        return user // Return updated user
    } catch (error) {
        throw new DatabaseError(error.message) // Wrap and throw database error
    }
}
