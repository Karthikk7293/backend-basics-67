import { model, Schema } from "mongoose";

const userSchema = Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    place: String
}, { timestamp: true })

export const User = model('user', userSchema)