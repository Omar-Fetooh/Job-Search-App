import express from 'express'
import './database/db.Connection.js'

import { AppError } from './src/utils/error.js'
import userRouter from './src/modules/user/user.routes.js'
const app = express()
const port = 3000

process.on('uncaughtException', (err) => {
    console.log('error')
})

app.use(express.json())

app.use('/users', userRouter)


app.use('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl}  Not found`, 404))
})

app.use((err, req, res, next) => {
    const { message, statusCode } = err;
    res.status(statusCode || 500).json({ message })
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandledRejection', (err) => {
    console.log('error')
})