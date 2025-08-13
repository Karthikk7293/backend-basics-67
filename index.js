import express from 'express'
import userRouter from './routes/userRouter.js'

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)


app.listen(3000, () => {
    console.log("app is running......");
})

// /users/login
// /users/register
// /users/profile