const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const authMiddleware = require('../middleware/authMiddleware')
const isWorkerMiddleware = require('../middleware/isWorkerMiddlware')
const router = new Router()


router
    .get(
        '/find-worker',
        ProfileController.findWorker)
    .get(
        '/services/:workerID',
        ProfileController.findServicesForWorker
    )
    .get(
        '/get-schedule',
        ProfileController.getSchedule)
    .get(
        '/picture',
        ProfileController.getPicture
    )
    .get(
        '/:username',
        ProfileController.getProfile
    )

router
    .post(
        '/create/service',
        authMiddleware,
        isWorkerMiddleware,
        ProfileController.createWorkerService
    )
    .post(
        '/worker/set-schedule',
        authMiddleware,
        isWorkerMiddleware,
        ProfileController.setSchedule,
    )

router
    .patch(
        '/worker/update',
        authMiddleware,
        isWorkerMiddleware,
        ProfileController.updateWorker
    )
    .patch(
        '/worker/update/weekend-days',
        authMiddleware,
        isWorkerMiddleware,
        ProfileController.updateWorkerWeekendDays
    )
    .patch(
        '/become-worker',
        authMiddleware,
        ProfileController.becomeWorker
    )


module.exports = router
