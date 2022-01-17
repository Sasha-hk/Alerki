const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const router = new Router()


// router
//     .get(
//         '/worker/:username',
//         ProfileController.getWorkerProfile
//     )
//     .get(
//         '/client/:username', 
//         authMiddleware,
//         AppointmentController.clientList
//     )

router
    .post('/create/service', 
        ProfileController.createWorkerService
    )
    .post(
        'worker-profile',
        () => true,
    )


module.exports = router
