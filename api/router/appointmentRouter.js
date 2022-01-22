const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()


router
    .get(
        '/details/:slug',
        authMiddleware,
    )
    .get(
        '/client/for',
        authMiddleware,
    )
    .get(
        '/client/from-now',
        authMiddleware,
    )
    .get(
        '/client/today',
        authMiddleware,
    )
    .get(
        '/worker/for',
        authMiddleware,
    )
    .get(
        '/worker/from-now',
        authMiddleware,
    )
    .get(
        '/worker/today',
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
        '/worker/cancel/:slug',
        authMiddleware,
    )
    .patch(
        '/worker/confirm/:slug',
        authMiddleware,
    )


module.exports = router
