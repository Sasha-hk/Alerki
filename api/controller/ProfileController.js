const WorkerWeekendDaysService = require('../service/WorkerWeekendDaysService')
const WorkerServiceService = require('../service/WorkerServicesService')
const UserPictureService = require('../service/UserPictureService')
const WorkerScheduleService = require('../service/WorkerScheduleService')
const ProfileService = require('../service/ProfileService')
const UserService = require('../service/UserService')
const ServiceService = require('../service/ServiceService')
const APIError = require('../exception/APIError')
const ProfileError = require('../exception/ProfileError')
const checkParams = require('../utils/validators/checkParams')
const GetWorkersDto = require('../dto/GetWorkersDto')
const ProfileDto = require('../dto/ProfileDto')
const WorkerServiceDto = require('../dto/WorkerServiceDto')
const WorkerProfileDto = require('../dto/WorkerProfileDto')


class ProfileController { 
  async getProfile(req, res, next) {
    try {
      const {username} = req.params
      
      checkParams.all({
        username,
      })

      const foundUser = await UserService.findUserByUsername({username})

      if (!foundUser) {
        throw APIError.NotFoundError()
      }
      let profileData = new ProfileDto(foundUser)
      
      if (foundUser.workerID) {
        const workerProfile = await ProfileService.findWorkerByID({id: profileData.workerID})
        const workerServices = await WorkerServiceService.findForWorker({workerID: workerProfile.id})
        profileData.addWorkerProfile(workerProfile)
        profileData.setWorkerServices(workerServices)
      }

      res.json({...profileData})
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async findServicesForWorker(req, res, next) {
    try {
      const {workerID} = req.params
      
      checkParams.all({
        workerID,
      })
      const workerServices = await WorkerServiceService.findForWorker({workerID})
      if (!workerServices || workerServices.length == 0) {
        throw APIError.NotFoundError()
      }
      const servicesData = new WorkerServiceDto(workerServices)
      
      res.json(servicesData.services ? servicesData.services : servicesData)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async findWorker(req, res, next) {
    try {
      const {service_id, limit, page} = req.query
      
      checkParams.all({
        service_id,
      })

      let workers = []

      const workerServices = await WorkerServiceService.find({serviceID: service_id, limit, page })
      for (const service of workerServices) {
        const worker = await UserService.findByWorkerID({workerID: service.workerID})
        const dto = new GetWorkersDto({worker, service})
        workers.push({...dto})
      }

      if (workers.length == 0) {
        throw APIError.NotFoundError()
      }

      res.json(workers)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async getSchedule(req, res, next) {
    try {
      const {
        year,
        month,
        worker_id
      } = req.query

      checkParams.all({
        year,
        month,
        worker_id
      })

      const from = new Date()
      from.setFullYear(year)
      from.setMonth(month)
      from.setDate(1)
      from.setHours(0)
      from.setMinutes(0)
      from.setSeconds(0)
      from.setMilliseconds(0)

      const to = new Date(from)
      to.setMonth(to.getMonth() + 1)
      to.setMilliseconds(-1)

      const workerProfile = await ProfileService.findWorkerByID({id: worker_id})

      if (!workerProfile) {
        throw APIError.NotFoundError(['worker with specefied id not found'])
      }

      const weekendDays = await WorkerWeekendDaysService.findByID({id: workerProfile.weekendDaysID})
      const scheduleDays = await WorkerScheduleService.getInRange({
        workerID: workerProfile.id,
        dateRange: [from, to],
      })

      const schedule = {
        weekendDays,
        workingStartTime: workerProfile.workingStartTime,
        workingEndTime: workerProfile.workingEndTime,
        schedule: scheduleDays,
      }

      res.json(schedule)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }
 
  async getPicture(req, res, next) {
    try {
      const {id} = req.query

      const picture = await UserPictureService.getByID({id})

      res.send(picture)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async updateWorker(req, res, next) {
    try {
      const {
        username,
        firstName,
        lastName,
        picture,
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
      } = req.body
      
      checkParams.atLeastOne({
        username,
        firstName,
        lastName,
        picture,
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
      })

      
      const updatedWorker = await ProfileService.updateWorker({
        id: req.user.workerID,
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
      })

      const workerData = new WorkerProfileDto(updatedWorker)
      
      res.json(workerData)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async updateProfile(req, res, next) {
    try {
      const {
        username,
        firstName,
        lastName,
        picture,
      } = req.body

      checkParams.atLeastOne({
        username,
        firstName,
        lastName,
        picture,
      })
      
      const updatedWorker = await UserService.updateProfile({
        id: req.accessToken.id,
        username,
        firstName,
        lastName,
        picture,
      })
      
      res.json(updatedWorker)
    }
    catch (e) {
      console.log(e, "<<<")
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async updateWorkerWeekendDays(req, res, next) {
    try {
      const {
        weekendDays
      } = req.body
      
      checkParams.all({
        weekendDays
      })

      const workerProfile = await ProfileService.findWorkerByID({
        id: req.user.workerID
      })

      const updateWeekendDays = await WorkerWeekendDaysService.update({
        id: workerProfile.weekendDaysID,
        ...weekendDays
      })

      res.json(updateWeekendDays)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async createWorkerService(req, res, next) {
    try {
      const {
        name,
        currency,
        price,
        location,
        duration,
      } = req.body

      const workerID = req.user.workerID
      const serviceID = (await ServiceService.findOrCreateByName({name})).id
 
      const newWorkerService = await WorkerServiceService.create({
        currency,
        price,
        location,
        duration,
        workerID,
        serviceID,
      })

      res.json(newWorkerService)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async becomeWorker(req, res, next) {
    try {
      const id = req.accessToken.id
 
      const userData = await UserService.findUserByID({id})
      const candedat = await ProfileService.findWorkerByID({id: userData.workerID})
      if (!candedat) {
        const updatedToWorker = await UserService.becomeWorker({id})

        res.json({workerID: updatedToWorker.workerID})
      }
      else {
        throw APIError.BadRequestError(['for this user worker allready exists'])
      }
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async setSchedule(req, res, next) {
    try {
      const {
        workingStartTime,
        workingEndTime,
        weekendDay,
        date
      } = req.body

      checkParams.all({
        date,
      })

      checkParams.atLeastOne({
        workingStartTime,
        workingEndTime,
        weekendDay,
      })

      if (workingStartTime || workingEndTime) {
        if (!workingStartTime || !workingEndTime) {
          throw ProfileError.RequiredAllTimeError()
        }
      }

      const schedule = await WorkerScheduleService.updateOrCreate({
        workerID: req.accessToken.workerID,
        workingStartTime,
        workingEndTime,
        weekendDay,
        date,
      })

      res.json(schedule)
    }
    catch (e) {
      console.log(e, '<<<<<<<<<<<<')
      res.status(e.status || 500).json(e.errors)
    }
  }
}


module.exports = new ProfileController()
