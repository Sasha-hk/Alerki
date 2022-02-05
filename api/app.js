const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const router = require('./router')


const app = express()
const corsOptions ={
    origin: process.env.CLIENT_HOST,
    credentials: true,
    optionSuccessStatus: 200
}

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


// routers
router(app)


module.exports = app
