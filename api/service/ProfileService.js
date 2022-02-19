const {ClientProfileModel, MasterProfileModel} = require('../db/models')
const MasterWeekendDaysService = require('./MasterWeekendDaysService')
const MasterScheduleService = require('./MasterScheduleService')
const UserService = require('./UserService')
const UserPictureService = require('./UserPictureService')
const checkTypes = require('../utils/validators/checkTypes')
const checkParams = require('../utils/validators/checkParams')


class ProfileService {
  async findMasterByID({id}) {
    checkTypes.hardNumber(Number(id), 'masterID')
    const foundMaster = await MasterProfileModel.findOne({
      raw: true,
      where: {
        id,
      },
    })

    return foundMaster
  }

  async findClientByID({id}) {
    const foundClient = await ClientProfileModel.findOne({
      raw: true,
      where: {
        id,
      },
    })

    return foundClient
  }

  async createClientProfile() {
    const newClientProfile = await ClientProfileModel.create()

    return newClientProfile.dataValues
  }

  async createMasterProfile() {
    const newWeekendDays = await MasterWeekendDaysService.create()
    const newMasterProfile = await MasterProfileModel.create({
      weekendDaysID: newWeekendDays.id
    })

    return newMasterProfile.dataValues
  }

  async updateMaster({
    id,
    workingStartTime,
    workingEndTime,
    shortBiography,
    instagramProfile,
  }) {
    await MasterProfileModel.update(
      {
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
      }, 
      {
        where: {
          id,
        },
      }
    )

    const updatedMaster = await MasterProfileModel.findOne({
      raw: true,
      where: {
        id,
      },
    })

    return updatedMaster
  }

  async makeNotAvailableMaster({id}) {
    const candedat = await this.findMasterByID({id})

    if (candedat) {
      const blockedMaster = await MasterProfileModel.update(
        {
          available: false,
        },
        {
          raw: true,
          returning: true,
          where: {
            id,
          },
        }
      )
      return blockedMaster[1][0]
    }
  }

  async makeAvailableMaster({id}) {
    const candedat = await this.findMasterByID({id})

    if (candedat) {
      const blockedMaster = await MasterProfileModel.update(
        {
          available: true,
        },
        {
          raw: true,
          returning: true,
          where: {
            id,
          },
        }
      )
      return blockedMaster[1][0]
    }
  }

  async getScheduleForMoth({
    year,
    month,
    masterID,
  }) {
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

    var schedule = await MasterScheduleService.getInRange({
      masterID: masterID,
      dateRange: [from, to],
    })

    return schedule
  }

  async getWeekendDays({
    masterID,
  }) {
    const weekendDays = await MasterWeekendDaysService.findByID({id: masterID})

    return weekendDays
  }
}


module.exports = new ProfileService()
