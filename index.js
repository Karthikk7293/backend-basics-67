import express from 'express'
import userRouter from './routes/userRouter.js'
import productRoter from './routes/productRouter.js'
import dotenv from 'dotenv'
import { connectDatabase } from './config/connectDatabase.js'
import { globalErrorHandler } from './middlewares/errorMiddleware.js'
import cors from 'cors'

dotenv.config()
connectDatabase()

const app = express()
app.use(cors())

app.use(express.json())

app.use('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce API</h1>")
})

app.use('/api/users', userRouter)
app.use('/api/products', productRoter)


app.use(globalErrorHandler)

app.listen(process.env.PORT, () => {
    console.log(`  Server is running on port ${process.env.PORT}`);
})

// /users/login
// /users/register
// /users/profile