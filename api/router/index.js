const authRouter = require('./auth')
// const appointmentClientRouter = require('./appointment-client')
// const appointmentWorkerRouter = require('./appointment-worker')


module.exports = (app) => {
    app.use('/auth', authRouter)

    // app.use('/appointment/client', appointmentClientRouter)
    // app.use('/appointment/worker', appointmentWorkerRouter)
}