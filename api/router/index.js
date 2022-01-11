const authRouter = require('./auth')


module.exports = (app) => {
    app.use('/auth', authRouter)
}