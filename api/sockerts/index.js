module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(1)
    io.on('upload profile picture', s => {
      console.log('recive message')
      for (var t = 0; t < 3; t++)
        setTimeout(() => s.emit('message', 'message from server'), 1000*t);
    })
  })
}