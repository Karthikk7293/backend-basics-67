import { statusCodes } from "../helpers/userHelpers.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });


    const status = statusCodes.find((item) => item.code === 200);

    res.status(status.code).json({ success: true, message: "login successful!" })


}