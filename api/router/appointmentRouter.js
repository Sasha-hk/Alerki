const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/authMiddleware')
const isMasterMiddleware = require('../middleware/isMasterMiddlware')
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
        '/master/get-day',
        authMiddleware,
        isMasterMiddleware,
        AppointmentController.masterGetDay
    )
    .get(
        '/master/from-now',
        authMiddleware,
        AppointmentController.masterFromNow
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
        '/master/cancel/:slug',
        authMiddleware,
        AppointmentController.masterCancel
    )
    .patch(
        '/master/confirm/:slug',
        authMiddleware,
        isMasterMiddleware,
        AppointmentController.masterConfirm
    )


module.exports = router
