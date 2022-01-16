const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()


router
    .get('/details/:slug', 
        authMiddleware,
        AppointmentController.workerDetails
    )
    .get('/list', 
        authMiddleware,
        AppointmentController.workerList
    )
    .get('/list/today', 
        authMiddleware,
        AppointmentController.workerListToday
    )

router
    .patch('/cancel/:slug', 
        authMiddleware,
        AppointmentController.workerCancel
    )
    .patch('/confirm/:slug', 
        authMiddleware,
        AppointmentController.workerConfirm
    )


module.exports = router
