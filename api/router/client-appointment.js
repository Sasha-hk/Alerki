const Router = require('express')
const AppointmentController = require('../controller/AppointmentController')
const authMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()


router
    .get('/details/:slug',
        authMiddleware,
        AppointmentController.clientDetails
    )
    .get('/list', 
        authMiddleware,
        AppointmentController.clientList
    )
    .get('/list/today',
        authMiddleware,
        AppointmentController.clientListToday
    )

router
    .post('/make', 
        authMiddleware,
        AppointmentController.clientMake
    )

router
    .patch('/cancel/:slug', 
        authMiddleware,
        AppointmentController.clientCancel
    )


module.exports = router
