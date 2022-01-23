const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()


router
    .get(
        '/details/:slug',
        authMiddleware,
        AppointmentController.details
    )
    .get(
        '/client/for',
        authMiddleware,
        AppointmentController.clientFor
    )
    .get(
        '/client/from-now',
        authMiddleware,
        AppointmentController.clientFromNow
    )
    .get(
        '/client/today',
        authMiddleware,
        AppointmentController.clientToday
    )
    .get(
        '/worker/for',
        authMiddleware,
        AppointmentController.workerFor
    )
    .get(
        '/worker/from-now',
        authMiddleware,
        AppointmentController.workerFromNow
    )
    .get(
        '/worker/today',
        authMiddleware,
        AppointmentController.workerToday
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
        AppointmentController.workerConfirm
    )


module.exports = router
