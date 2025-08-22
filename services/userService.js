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