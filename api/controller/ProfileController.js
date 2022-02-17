const MasterWeekendDaysService = require('../service/MasterWeekendDaysService')
const MasterServiceService = require('../service/MasterServicesService')
const UserPictureService = require('../service/UserPictureService')
const MasterScheduleService = require('../service/MasterScheduleService')
const ProfileService = require('../service/ProfileService')
const UserService = require('../service/UserService')
const ServiceService = require('../service/ServiceService')
const APIError = require('../exception/APIError')
const ProfileError = require('../exception/ProfileError')
const checkParams = require('../utils/validators/checkParams')
const GetMastersDto = require('../dto/GetMastersDto')
const ProfileDto = require('../dto/ProfileDto')
const MasterServiceDto = require('../dto/MasterServiceDto')
const MasterProfileDto = require('../dto/MasterProfileDto')
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
      
      if (foundUser.masterID) {
        const masterProfile = await ProfileService.findMasterByID({id: profileData.masterID})
        const masterServices = await MasterServiceService.findForMaster({masterID: masterProfile.id})
        profileData.addMasterProfile(masterProfile)
        profileData.setMasterServices(masterServices)
      }

      res.json({...profileData})
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async findServicesForMaster(req, res, next) {
    try {
      const {masterID} = req.params
      
      checkParams.all({
        masterID,
      })
      const masterServices = await MasterServiceService.findForMaster({masterID})
      if (!masterServices || masterServices.length == 0) {
        throw APIError.NotFoundError()
      }
      const servicesData = new MasterServiceDto(masterServices)
      
      res.json(servicesData.services ? servicesData.services : servicesData)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async findMaster(req, res, next) {
    try {
      const {service_id, limit, page} = req.query
      
      checkParams.all({
        service_id,
      })

      let masters = []

      const masterServices = await MasterServiceService.find({serviceID: service_id, limit, page })
      for (const service of masterServices) {
        const master = await UserService.findByMasterID({masterID: service.masterID})
        const dto = new GetMastersDto({master, service})
        masters.push({...dto})
      }

      if (masters.length == 0) {
        throw APIError.NotFoundError()
      }

      res.json(masters)
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
        master_id
      } = req.query

      checkParams.all({
        year,
        month,
        master_id
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

      const masterProfile = await ProfileService.findMasterByID({id: master_id})

      if (!masterProfile) {
        throw APIError.NotFoundError(['master with specefied id not found'])
      }

      const weekendDays = await MasterWeekendDaysService.findByID({id: masterProfile.weekendDaysID})
      const scheduleDays = await MasterScheduleService.getInRange({
        masterID: masterProfile.id,
        dateRange: [from, to],
      })

      const schedule = {
        weekendDays,
        workingStartTime: masterProfile.workingStartTime,
        workingEndTime: masterProfile.workingEndTime,
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

  async updateMaster(req, res, next) {
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

      
      const updatedMaster = await ProfileService.updateMaster({
        id: req.user.masterID,
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
      })

      const masterData = new MasterProfileDto(updatedMaster)
      
      res.json(masterData)
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

      const checkUsername = await UserService.findUserByUsername({username})
      
      if (checkUsername) {
        if (checkUsername.id != id) {
          throw ProfileError.UsernameExistsError()
        }
      }

      const updatedMaster = await UserService.updateProfile({
        id,
        username,
        firstName,
        lastName,
        pictureID: updatedPicture?.id
      })

      const userData = new UserDto(updatedMaster)
      
      res.json(userData)
    }
    catch (e) {
      console.log(e)
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async updateMasterWeekendDays(req, res, next) {
    try {
      const {
        weekendDays
      } = req.body
      
      checkParams.all({
        weekendDays
      })

      const masterProfile = await ProfileService.findMasterByID({
        id: req.user.masterID
      })

      const updateWeekendDays = await MasterWeekendDaysService.update({
        id: masterProfile.weekendDaysID,
        ...weekendDays
      })

      res.json(updateWeekendDays)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async createService(req, res, next) {
    try {
      const {
        name,
        currency,
        price,
        location,
        duration,
      } = req.body

      const masterID = req.user.masterID
      const serviceID = (await ServiceService.findOrCreateByName({name})).id
 
      const newMasterService = await MasterServiceService.create({
        name,
        currency,
        price,
        location,
        duration,
        masterID,
        serviceID,
      })

      res.json(newMasterService)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async updateService(req, res, next) {
    try {
      const {
        id,
        name,
        currency,
        price,
        location,
        duration,
      } = req.body

      const masterID = req.user.masterID

      const serviceID = (await ServiceService.findOrCreateByName({name})).id
      const updatedService = await MasterServiceService.update({
        id,
        currency,
        price,
        location,
        duration,
        masterID,
        serviceID,
      })

      res.json(updatedService)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async deleteService(req, res, next) {
    try {
      const {id} = req.body

      const masterID = req.user.masterID
 
      const newMasterService = await MasterServiceService.delete({id, masterID})

      res.json(newMasterService)
    }
    catch (e) {
      console.log(e)
      res.status(e.status || 500).json(e.errors) 
    }
  }

  async becomeMaster(req, res, next) {
    try {
      const id = req.accessToken.id
      const user = await UserService.findUserByID({id})
      const candedat = await ProfileService.findMasterByID({id: user.masterID})
      if (!candedat) {
        await UserService.becomeMaster({id})
      }
      else {
        await ProfileService.makeAvailableMaster({id: user.id})
        await UserService.setProfileType({id: user.id, type: 'master'})
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
        if (user.masterID) {
          await ProfileService.makeNotAvailableMaster({id: user.masterID})
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

      const schedule = await MasterScheduleService.updateOrCreate({
        masterID: req.accessToken.masterID,
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
