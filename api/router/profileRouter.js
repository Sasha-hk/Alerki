const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const authMiddleware = require('../middleware/authMiddleware')
const isMasterMiddleware = require('../middleware/isMasterMiddlware')
const router = new Router()


// http
router
  .get(
    '/find-master',
    ProfileController.findMaster
  )
  .get(
    '/services/:masterID',
    ProfileController.findServicesForMaster
  )
  .get(
    '/get-schedule',
    ProfileController.getSchedule
  )
  .get(
    '/picture/:id',
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
    isMasterMiddleware,
    ProfileController.createMasterService
  )
  .post(
    '/master/set-schedule',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.setSchedule,
  )

router
  .patch(
    '/update',
    authMiddleware,
    ProfileController.updateProfile
  )
  .patch(
    '/master/update',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.updateMaster
  )
  .patch(
    '/master/update/weekend-days',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.updateMasterWeekendDays
  )
  .patch(
    '/become-master',
    authMiddleware,
    ProfileController.becomeMaster
  )
  .patch(
    '/become-client',
    authMiddleware,
    ProfileController.becomeClient
  )


module.exports = router
