const {AppointmentModel, Sequelize} = require('../db/models')
const MasterServicesService = require('./MasterServicesService')
const MasterScheduleService = require('./MasterScheduleService')
const ProfileService = require('./ProfileService')
const MasterWeekendDaysService = require('./MasterWeekendDaysService')
const generateSlug = require('../utils/generateSlug')
const AppointmentError = require('../exception/AppointmentError')
const checkDate = require('../utils/validators/checkDate')


const weekDays = ['monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

class AppointmentService { 
  async checkScheduleDays({
    master,
    masterID,
    weekendDaysID,
    appointmentStartTime,
    appointmentEndTime,
  }) {
    const masterSchedule = await MasterScheduleService.findByMasterIDAndDate({
      masterID,
      date: appointmentStartTime,
    })

    if (masterSchedule) {
      if (masterSchedule.workingStartTime) {
        this.checkWorkingTime({
          appointmentStartTime,
          appointmentEndTime,
          master: {
            workingStartTime: masterSchedule.workingStartTime,
            workingEndTime: masterSchedule.workingEndTime,
          },
        })
      }
      if (masterSchedule.weekendDay) {
        throw AppointmentError.WeekendDayError()
      }
      else {
        await this.checkWeekendDays({
          weekendDaysID,
          appointmentStartTime,
        })
      }
    }
    else {
      this.checkWorkingTime({
        appointmentStartTime,
        appointmentEndTime,
        master,
      })

      await this.checkWeekendDays({
        weekendDaysID,
        appointmentStartTime,
      })
    }
  }

  async checkEntryAppointments({
    startTime,
    endTime,
    masterID,
  }) {
    const byStartTime = await AppointmentModel.findAll({
      raw: true,
      where: {
        masterID,
        appointmentStartTime: {
          [Sequelize.Op.between]: [startTime, endTime],
        },
      },
    })
        
    const byEndTime = await AppointmentModel.findAll({
      raw: true,
      where: {
        masterID,
        appointmentEndTime: {
          [Sequelize.Op.between]: [startTime, endTime],
        },
      },
    })
        
    if (byStartTime.length != 0 || byEndTime.length != 0) {
      throw AppointmentError.BusyTimeError()
    }
  }

  async checkWeekendDays({
    weekendDaysID,
    appointmentStartTime,
  }) {
    const weekendDays = await MasterWeekendDaysService.findByID({id: weekendDaysID})
    Object.keys(weekendDays).forEach(w => {
      if (weekendDays[w]) {
        if (weekDays.indexOf(w) == appointmentStartTime.getDay()) {
          throw AppointmentError.AppointmentTimeInWeekendDayError()
        }
      }
    })
  }

  checkWorkingTime({
    appointmentStartTime,
    appointmentEndTime,
    master,
  }) {
    let fromMilliseconds = 0
    fromMilliseconds += appointmentStartTime.getHours() * 60 * 60 * 1000
    fromMilliseconds += appointmentStartTime.getMinutes() * 60 * 1000
    fromMilliseconds += appointmentStartTime.getSeconds() * 1000
    fromMilliseconds += appointmentStartTime.getMilliseconds()

    let toMilliseconds = 0
    toMilliseconds += appointmentEndTime.getHours() * 60 * 60 * 1000
    toMilliseconds += appointmentEndTime.getMinutes() * 60 * 1000
    toMilliseconds += appointmentEndTime.getSeconds() * 1000
    toMilliseconds += appointmentEndTime.getMilliseconds()

    if (
      master.workingStartTime > fromMilliseconds || master.workingStartTime > toMilliseconds ||
            master.workingEndTime < fromMilliseconds || master.workingEndTime < toMilliseconds
    ) {
      throw AppointmentError.OutOfWorkingTimeError()
    }
  }

  async details({slug}) {
    const details = await AppointmentModel.findOne({
      raw: true,
      where: {
        slug,
      },
    })

    return details
  }

  async create({
    masterID,
    masterServiceID,
    clientID,
    appointmentStartTime,
  }) {
    // get master and check if it is exists
    const master = await ProfileService.findMasterByID({id: masterID})

    if (!master) {
      throw AppointmentError.MasterNotFoundError()
    }

    // get master service and check if it is exists
    const masterService = await MasterServicesService.findByID({id: masterServiceID})
       
    if (!masterService) {
      throw AppointmentError.ServiceNotFoundError()
    }

    // generate needed data
    const slug = await generateSlug(AppointmentModel)
    const appointmentEndTime = new Date(appointmentStartTime)
    appointmentEndTime.setTime(appointmentEndTime.getTime() + masterService.duration)

    // checks
    await this.checkEntryAppointments({
      startTime: appointmentStartTime, 
      endTime: appointmentEndTime,
      masterID,
    })

    await this.checkScheduleDays({
      master,
      masterID: master.id,
      weekendDaysID: master.weekendDaysID,
      appointmentStartTime,
      appointmentEndTime,
    })

    // create appointment
    const newAppointment = await AppointmentModel.create({
      slug,
      masterID,
      masterServiceID,
      clientID,
      duration: masterService.duration,
      appointmentStartTime,
      appointmentEndTime,
    })

    return newAppointment.dataValues
  }

  async clientGetDay({
    clientID,
    date,
  }) {
    // prepare dates
    const startDate = new Date(date)

    checkDate(startDate)
        
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    startDate.setMilliseconds(0)

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 1)
    endDate.setMilliseconds(-1)

    const dayAppointments = await AppointmentModel.findAll({
      raw: true,
      where: {
        clientID,
        appointmentStartTime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
        appointmentEndTime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
    })

    return dayAppointments
  }

  async masterGetDay({
    masterID,
    date,
  }) {
    // prepare dates
    const startDate = new Date(date)

    checkDate(startDate)
        
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    startDate.setMilliseconds(0)

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 1)
    endDate.setHours(0)

    const dayAppointments = await AppointmentModel.findAll({
      raw: true,
      where: {
        masterID,
        appointmentStartTime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
        appointmentEndTime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
    })

    return dayAppointments
  }

  async masterFromNow({
    masterID,
    now,
  }) {
    // prepare dates
    const nowDate = new Date(now)

    checkDate(nowDate)

    const dayAppointments = await AppointmentModel.findAll({
      raw: true,
      where: {
        masterID,
        appointmentStartTime: {
          [Sequelize.Op.gte]: nowDate,
        },
      },
    })

    return dayAppointments
  }

  async clientFromNow({
    clientID,
    now,
  }) {
    // prepare dates
    const nowDate = new Date(now)

    checkDate(nowDate)

    const dayAppointments = await AppointmentModel.findAll({
      raw: true,
      where: {
        clientID,
        appointmentStartTime: {
          [Sequelize.Op.gte]: nowDate,
        },
      },
    })

    return dayAppointments
  }

  async clientCancel({clientID, slug}) {
    const candedat = await AppointmentModel.findOne({
      raw: true,
      where: {
        slug,
      },
    })
        
    if (candedat) {
      if (clientID != candedat.clientID) {
        throw AppointmentError.NotBelongsToUserError()
      }

      const updatedAppointment = await AppointmentModel.update(
        {
          clientConfirm: false,
        },
        {
          returning: true,
          where: {
            slug,
          },
        },
      )

      return updatedAppointment[1][0]
    }
    else {
      throw AppointmentError.NotFoundError()
    }
  }

  async masterCancel({masterID, slug}) {
    const candedat = await AppointmentModel.findOne({
      raw: true,
      where: {
        slug,
      },
    })
        
    if (candedat) {
      if (masterID != candedat.masterID) {
        throw AppointmentError.NotBelongsToUserError()
      }

      const updatedAppointment = await AppointmentModel.update(
        {
          masterConfirm: false,
        },
        {
          returning: true,
          where: {
            slug,
          },
        },
      )

      return updatedAppointment[1][0]
    }
    else {
      throw AppointmentError.NotFoundError()
    }
  }

  async masterConfirm({masterID, slug}) {
    const candedat = await AppointmentModel.findOne({
      raw: true,
      where: {
        slug,
      },
    })
        
    if (candedat) {
      if (masterID != candedat.masterID) {
        throw AppointmentError.NotBelongsToUserError()
      }

      const updatedAppointment = await AppointmentModel.update(
        {
          masterConfirm: true,
        },
        {
          returning: true,
          where: {
            slug,
          },
        },
      )

      return updatedAppointment[1][0]
    }
    else {
      throw AppointmentError.NotFoundError()
    }
  }
}


module.exports = new AppointmentService()
