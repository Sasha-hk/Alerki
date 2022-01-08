require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const dbConnect = require('./models/connect')

const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routers
app.get('/', (req, res) => {
    res.send('Okay!')
})


const start = async () => {
    try {
        // await dbConnect(() => {
        //     console.log('Connected to database')
        // })
        app.listen(PORT, () => {
            console.log(`Server started! http://localhost:${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()
