import mongoose from "mongoose";


export const connectDatabase = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log("database connected...");
        }).catch((err) => {
            console.log("database connection failed", err);
        })
    } catch (error) {
        console.log(error);

    }
}