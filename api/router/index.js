const authRouter = require('./auth')
// const clientAppointmentRouter = require('./appointment-client')
// const workerAppointmentRouter = require('./appointment-worker')


module.exports = (app) => {
    app.use('/auth', authRouter)

    // app.use('/appointment/client', clientAppointmentRouter)
    // app.use('/appointment/worker', workerAppointmentRouter)
}