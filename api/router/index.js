const authRouter = require('./authRouter')
const appointmentRouter = require('./appointmentRouter')
const profileRouter = require('./profileRouter')
const serviceRouter = require('./servicesRouter')


module.exports = (app) => {
    app.use('/auth', authRouter)
    app.use('/appointment/', appointmentRouter)
    app.use('/profile', profileRouter)
    app.use('/services', serviceRouter)
}
