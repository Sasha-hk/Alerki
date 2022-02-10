const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io')
const io = socketIO(server, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "http://192.168.1.11:3000/"
    }
  }
})


const router = require('./router')

const corsOptions ={
    origin: process.env.CLIENT_HOST,
    credentials: true,
    optionSuccessStatus: 200
}

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors(corsOptions))


// routers
router(app)

// socket
io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(message)
    console.log(`message from ${socket.id} : ${message.message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})



module.exports = server
