const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const authMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()


router
    .get('/find-worker', ProfileController.findWorker)
    .get('/get-schedule', ProfileController.getSchedule)

router
    .post(
        '/create/service',
        authMiddleware,
        ProfileController.createWorkerService
    )


module.exports = router
