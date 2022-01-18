const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const authMiddlweare = require('../middleware/AuthMiddleware')
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
    .post(
        '/create/service',
        authMiddlweare,
        ProfileController.createWorkerService
    )
    .post(
        'worker-profile',
        () => true,
    )


module.exports = router
