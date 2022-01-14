const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const router = new Router()


router
    .get('/details/:slug', AppointmentController.clientDetails)
    .get('/list', AppointmentController.clientList)
    .get('/list/today', AppointmentController.clientListToday)

router
    .post('/make', AppointmentController.clientMake)

router
    .patch('/cancel/:slug', AppointmentController.clientCancel)


module.exports = router
