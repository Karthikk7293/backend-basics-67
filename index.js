import express from 'express'
import userRouter from './routes/userRouter.js'
import productRoter from './routes/productRouter.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRoter)


app.listen(process.env.PORT, () => {
    console.log(`  Server is running on port ${process.env.PORT}`);
})

// /users/login
// /users/register
// /users/profile