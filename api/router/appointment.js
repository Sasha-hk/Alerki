const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()


// client appointment
router
    .get('/client/details/:slug',
        authMiddleware,
        AppointmentController.clientDetails
    )
    .get('/client/list',
        authMiddleware,
        AppointmentController.clientList
    )
    .get('/client/list/today',
        authMiddleware,
        AppointmentController.clientListToday
    )

router
    .post('/client/make', 
        authMiddleware,
        AppointmentController.clientMake
    )

router
    .patch('/client/cancel/:slug', 
        authMiddleware,
        AppointmentController.clientCancel
    )


// worker appointment
router
    .get('/worker/details/:slug', 
        authMiddleware,
        AppointmentController.workerDetails
    )
    .get('/worker/list', 
        authMiddleware,
        AppointmentController.workerList
    )
    .get('/worker/list/today', 
        authMiddleware,
        AppointmentController.workerListToday
    )

router
    .patch('/worker/cancel/:slug', 
        authMiddleware,
        AppointmentController.workerCancel
    )
    .patch('/worker/confirm/:slug', 
        authMiddleware,
        AppointmentController.workerConfirm
    )


module.exports = router
