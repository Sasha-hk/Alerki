const authRouter = require('./auth')
const clientAppointmentRouter = require('./client-appointment')
// const workerAppointmentRouter = require('./worker-appointment')
const serviceRouter = require('./services')


module.exports = (app) => {
    app.use('/auth', authRouter)

    app.use('/appointment/client', clientAppointmentRouter)
    // app.use('/appointment/worker', workerAppointmentRouter)

    app.use('/services', serviceRouter)
}