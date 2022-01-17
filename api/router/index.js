const authRouter = require('./auth')
const appointmentRouter = require('./appointment')
const clientAppointmentRouter = require('./client-appointment')
const workerAppointmentRouter = require('./worker-appointment')
const profileRouter = require('./profile')
const serviceRouter = require('./services')


module.exports = (app) => {
    app.use('/auth', authRouter)

    app.use('/appointment/client', clientAppointmentRouter)
    app.use('/appointment/worker', workerAppointmentRouter)
    app.use('/appointment/', appointmentRouter)

    app.use('/profile', profileRouter)

    app.use('/services', serviceRouter)
}