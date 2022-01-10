const someRouter = (req, res) => {
    res.send('OK')
}

module.exports = (app) => {
    app.use('/', someRouter)
}