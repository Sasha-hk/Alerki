require('dotenv').config()
const express = require('express')
const router = require('./router.js')



const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())

// router
app.use('/', router)

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started! http://localhost:${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()
