import { model, Schema } from "mongoose";

const userSchema = Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'product manager', 'payment manager'], default: "user" },
    place: String
}, { timestamp: true })

userSchema.index({ place: 1 })

export const User = model('user', userSchema)