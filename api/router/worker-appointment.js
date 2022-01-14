const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const router = new Router()


router
    .get('/details/:slug', AppointmentController.workerDetails)
    .get('/list', AppointmentController.workerList)
    .get('/list/today', AppointmentController.workerListToday)

router
    .patch('/cancel/:slug', AppointmentController.workerCancel)
    .patch('/confirm/:slug', AppointmentController.workerConfirm)


module.exports = router
