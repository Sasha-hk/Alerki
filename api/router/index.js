const authRouter = require('./auth')
const clientAppointmentRouter = require('./client-appointment')
// const workerAppointmentRouter = require('./worker-appointment')


module.exports = (app) => {
    app.use('/auth', authRouter)

    app.use('/appointment/client', clientAppointmentRouter)
    // app.use('/appointment/worker', workerAppointmentRouter)
}