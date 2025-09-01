import { DatabaseError, NotFoundError, ValidationError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/userModel.js";

export const createUserService = async (userDetails) => {
    try {

        const user = new User(userDetails)
        await user.save()

        // console.log(user);
        return { success: true, user }

    } catch (error) {
        console.log(error.message);
        return { success: false, error: error.message }
    }
}

export const loginUserService = async (payload) => {
    const { email, password } = payload;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotFoundError("user not found!")
        }
        if (user.password !== password) {
            throw new ValidationError("incorrect password!")
        }
        return user
    } catch (error) {
        throw new DatabaseError(error.message)
    }
}

export const getuserDetailsWithIdService = async (id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            throw new NotFoundError("user not found!")
        }
        return user
    } catch (error) {
        throw new DatabaseError(error.message)
    }
}