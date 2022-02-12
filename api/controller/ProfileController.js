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
const UserDto = require('../dto/UserDto')
const FileType = require('file-type')


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
      const {id} = req.params

      const picture = await UserPictureService.getByID({id})

      if (!picture) {
        throw APIError.NotFoundError()
      }
 
      const contentType = await FileType.fromBuffer(picture.picture)
      
      if (!contentType) {
        throw APIError.ServerError()
      }

      res.type(contentType.mime)
      res.send(picture.picture);
    }
    catch (e) {
      console.log(e)
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
      const id = req.accessToken.id
      const picture = req.files?.picture?.data
      const {
        username,
        firstName,
        lastName,
      } = req.body


      checkParams.atLeastOne({
        username,
        firstName,
        lastName,
      })
      
      if (picture) {
        var updatedPicture = await UserPictureService.update({id, picture})
      }

      const updatedWorker = await UserService.updateProfile({
        id,
        username,
        firstName,
        lastName,
        pictureID: updatedPicture?.id
      })

      const userData = new UserDto(updatedWorker)
      
      res.json(userData)
    }
    catch (e) {
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

  async becomeMaster(req, res, next) {
    try {
      const id = req.accessToken.id
      const user = await UserService.findUserByID({id})
      const candedat = await ProfileService.findWorkerByID({id: user.workerID})
      if (!candedat) {
        await UserService.becomeWorker({id})
      }
      else {
        await ProfileService.makeAvailableMaster({id: user.id})
        await UserService.setProfileType({id: user.id, type: 'worker'})
      }

      const updatedUser = await UserService.findUserByID({id})
      const userData = new UserDto(updatedUser)

      res.json(userData)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async becomeClient(req, res, next) {
    try {
      const id = req.accessToken.id 
      const user = await UserService.findUserByID({id})
      const candedat = await ProfileService.findClientByID({id: user.clientID})
      if (!candedat) {
        await UserService.becomeClient({id})
      }
      else {
        if (user.workerID) {
          await ProfileService.makeNotAvailableMaster({id: user.workerID})
        }
        await ProfileService.makeNotAvailableMaster({id: user.id})
        await UserService.setProfileType({id: user.id, type: 'client'})
      }

      const updatedUser = await UserService.findUserByID({id})
      const userData = new UserDto(updatedUser)

      res.json(userData)
    }
    catch (e) {
      console.log(e)
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
      res.status(e.status || 500).json(e.errors)
    }
  }
}


module.exports = new ProfileController()
