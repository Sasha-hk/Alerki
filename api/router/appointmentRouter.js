const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/authMiddleware')
const isWorkerMiddleware = require('../middleware/isWorkerMiddlware')
const router = new Router()


router
    .get(
        '/details/:slug',
        authMiddleware,
        AppointmentController.details
    )
    .get(
        '/client/get-day',
        authMiddleware,
        AppointmentController.clientGetDay
    )
    .get(
        '/client/from-now',
        authMiddleware,
        AppointmentController.clientFromNow
    )
    .get(
        '/worker/get-day',
        authMiddleware,
        isWorkerMiddleware,
        AppointmentController.workerGetDay
    )
    .get(
        '/worker/from-now',
        authMiddleware,
        AppointmentController.workerFromNow
    ) 

router
    .post(
        '/make-appointment',
        authMiddleware,
        AppointmentController.create
    )

router
    .patch(
        '/client/cancel/:slug',
        authMiddleware,
        AppointmentController.clientCancel
    )
    .patch(
        '/worker/cancel/:slug',
        authMiddleware,
        AppointmentController.workerCancel
    )
    .patch(
        '/worker/confirm/:slug',
        authMiddleware,
        isWorkerMiddleware,
        AppointmentController.masterConfirm
    )


module.exports = router
