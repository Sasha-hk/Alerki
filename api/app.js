const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const router = require('./router')


const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routers
router(app)


module.exports = app
