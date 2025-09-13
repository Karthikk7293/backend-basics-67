import express from 'express'
import userRouter from './routes/userRouter.js'
import productRoter from './routes/productRouter.js'
import dotenv from 'dotenv'
import { connectDatabase } from './config/connectDatabase.js'
import { globalErrorHandler } from './middlewares/errorMiddleware.js'
import cors from 'cors'

dotenv.config()
connectDatabase()

const allowOrigins = ['http://localhost:5173', 'https://react-basics-67.vercel.app']

const app = express()
app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true)

        if (allowOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(new Error('Not allowed by CORS'))
        }

    }
}))

app.use(express.json())



app.use('/api/users', userRouter)
app.use('/api/products', productRoter)

app.use('/api', (req, res) => {
    res.send("Welcome to E-commerce API")
})

app.use(globalErrorHandler)

app.listen(process.env.PORT, () => {
    console.log(`  Server is running on port ${process.env.PORT}`);
})

// /users/login
// /users/register
// /users/profile