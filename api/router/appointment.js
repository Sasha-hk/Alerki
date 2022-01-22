const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()


router
    .get(
        '/details/:slug',
        authMiddleware,
    )
    .get(
        '/clietn/appointments',
        authMiddleware,
    )
    .get(
        '/client/list',
        authMiddleware,
    )
    .get(
        '/client/list/today',
        authMiddleware,
    )
    .get(
        '/worker/appointments',
        authMiddleware,
    )
    .get(
        '/worker/list',
        authMiddleware,
    )
    .get(
        '/worker/list/today',
        authMiddleware,
    )

router
    .post(
        '/make-appointment',
        authMiddleware,
    )

router
    .patch(
        '/client/cancel/:slug',
        authMiddleware,
    )
    .patch(
        '/worker/confirm/:slug',
        authMiddleware,
    )
    .patch(
        '/worker/cancel/:slug',
        authMiddleware,
    )


module.exports = router
