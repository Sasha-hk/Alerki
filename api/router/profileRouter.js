const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()


router
    .get(
        '/find-worker',
        ProfileController.findWorker)
    .get(
        '/get-schedule',
        ProfileController.getSchedule)
    .get(
        '/picture',

    )


router
    .post(
        '/create/service',
        authMiddleware,
        ProfileController.createWorkerService
    )
    .post(
        '/become-worker',
        authMiddleware,

    )

router
    .patch(
        '/update',
        authMiddleware,

    )


module.exports = router
