const Router = require('express')
const ProfileController = require('../controller/ProfileController')
const authMiddleware = require('../middleware/authMiddleware')
const isMasterMiddleware = require('../middleware/isMasterMiddlware')
const router = new Router()


// http
router
  .get(
    '/find-master',
    ProfileController.findMaster,
  )
  .get(
    '/services/:masterID',
    ProfileController.findServicesForMaster,
  )
  .get(
    '/get-schedule',
    ProfileController.getSchedule,
  )
  .get(
    '/picture/:id',
    ProfileController.getPicture,
  )
  .get(
    '/:username',
    ProfileController.getProfile,
  )

router
  .post(
    '/create/service',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.createService,
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
    ProfileController.updateProfile,
  )
  .patch(
    '/update/service',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.updateService,
  )
  .patch(
    '/update/master',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.updateMaster,
  )
  .patch(
    '/update/master/weekend-days',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.updateMasterWeekendDays,
  )
  .patch(
    '/become-master',
    authMiddleware,
    ProfileController.becomeMaster,
  )
  .patch(
    '/become-client',
    authMiddleware,
    ProfileController.becomeClient,
  )

router
  .delete(
    '/service',
    authMiddleware,
    isMasterMiddleware,
    ProfileController.deleteService,
  )


module.exports = router
