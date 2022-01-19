const authRouter = require('./auth')
const appointmentRouter = require('./appointment')
const profileRouter = require('./profile')
const serviceRouter = require('./services')


module.exports = (app) => {
    app.use('/auth', authRouter)

    app.use('/appointment/', appointmentRouter)

    app.use('/profile', profileRouter)

    app.use('/services', serviceRouter)
}
