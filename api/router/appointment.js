const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const router = new Router()


router
    .get('/find-worker', AppointmentController.findWorker)


module.exports = router