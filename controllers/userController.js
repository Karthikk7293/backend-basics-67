import { statusCodes } from "../helpers/userHelpers.js";
import { createUserService } from "../services/userService.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });


    const status = statusCodes.find((item) => item.code === 200);

    res.status(status.code).json({ success: true, message: "login successful!" })


}

export const createUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body

        console.log(req.body);


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