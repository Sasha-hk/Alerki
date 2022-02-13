const {AppointmentModel, Sequelize} = require('../db/models')
const WorkerServicesService = require('./WorkerServicesService')
const MasterScheduleService = require('./MasterScheduleService')
const ProfileService = require('./ProfileService')
const WorkerWeekendDaysService = require('./WorkerWeekendDaysService')
const generateSlug = require('../utils/generateSlug')
const AppointmentError = require('../exception/AppointmentError')
const checkDate = require('../utils/validators/checkDate')


const weekDays = ['monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

class AppointmentService { 
    async checkScheduleDays({
        worker,
        workerID,
        weekendDaysID,
        appointmentStartTime,
        appointmentEndTime
    }) {
        const workerSchedule = await MasterScheduleService.findByWorkerIDAndDate({
            workerID,
            date: appointmentStartTime,
        })

        if (workerSchedule) {
            if (workerSchedule.workingStartTime) {
                this.checkWorkingTime({
                    appointmentStartTime,
                    appointmentEndTime,
                    worker: {
                        workingStartTime: workerSchedule.workingStartTime,
                        workingEndTime: workerSchedule.workingEndTime
                    },
                })
            }
            if (workerSchedule.weekendDay) {
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
                worker,
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
        workerID,
    }) {
        const byStartTime = await AppointmentModel.findAll({
            raw: true,
            where: {
                workerID,
                appointmentStartTime: {
                    [Sequelize.Op.between]: [startTime, endTime],
                },
            }
        })
        
        const byEndTime = await AppointmentModel.findAll({
            raw: true,
            where: {
                workerID,
                appointmentEndTime: {
                    [Sequelize.Op.between]: [startTime, endTime]
                },
            }
        })
        
        if (byStartTime.length != 0 || byEndTime.length != 0) {
            throw AppointmentError.BusyTimeError()
        }
    }

    async checkWeekendDays({
        weekendDaysID,
        appointmentStartTime
    }) {
        const weekendDays = await WorkerWeekendDaysService.findByID({id: weekendDaysID})
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
        worker,
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
            worker.workingStartTime > fromMilliseconds || worker.workingStartTime > toMilliseconds ||
            worker.workingEndTime < fromMilliseconds || worker.workingEndTime < toMilliseconds
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
        workerID,
        masterServiceID,
        clientID,
        appointmentStartTime,
    }) {
        // get worker and check if it is exists
        const worker = await ProfileService.findWorkerByID({id: workerID})

        if (!worker) {
            throw AppointmentError.WorkerNotFoundError()
        }

        // get worker service and check if it is exists
        const workerService = await WorkerServicesService.findByID({id: masterServiceID})
       
        if (!workerService) {
            throw AppointmentError.ServiceNotFoundError()
        }

        // generate needed data
        const slug = await generateSlug(AppointmentModel)
        const appointmentEndTime = new Date(appointmentStartTime)
        appointmentEndTime.setTime(appointmentEndTime.getTime() + workerService.duration)

        // checks
        await this.checkEntryAppointments({
            startTime: appointmentStartTime, 
            endTime: appointmentEndTime,
            workerID,
        })

        await this.checkScheduleDays({
            worker,
            workerID: worker.id,
            weekendDaysID: worker.weekendDaysID,
            appointmentStartTime,
            appointmentEndTime
        })

        // create appointment
        const newAppointment = await AppointmentModel.create({
            slug,
            workerID,
            masterServiceID,
            clientID,
            duration: workerService.duration,
            appointmentStartTime,
            appointmentEndTime,
        })

        return newAppointment.dataValues
    }

    async clientGetDay({
        clientID,
        date
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
            }
        })

        return dayAppointments
    }

    async workerGetDay({
        workerID,
        date
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
                workerID,
                appointmentStartTime: {
                    [Sequelize.Op.between]: [startDate, endDate],
                },
                appointmentEndTime: {
                    [Sequelize.Op.between]: [startDate, endDate],
                },
            }
        })

        return dayAppointments
    }

    async workerFromNow({
        workerID,
        now
    }) {
        // prepare dates
        const nowDate = new Date(now)

        checkDate(nowDate)

        const dayAppointments = await AppointmentModel.findAll({
            raw: true,
            where: {
                workerID,
                appointmentStartTime: {
                    [Sequelize.Op.gte]: nowDate,
                },
            }
        })

        return dayAppointments
    }

    async clientFromNow({
        clientID,
        now
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
            }
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
                }
            )

            return updatedAppointment[1][0]
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }

    async workerCancel({workerID, slug}) {
        const candedat = await AppointmentModel.findOne({
            raw: true,
            where: {
                slug,
            },
        })
        
        if (candedat) {
            if (workerID != candedat.workerID) {
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
                }
            )

            return updatedAppointment[1][0]
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }

    async masterConfirm({workerID, slug}) {
        const candedat = await AppointmentModel.findOne({
            raw: true,
            where: {
                slug,
            },
        })
        
        if (candedat) {
            if (workerID != candedat.workerID) {
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
                }
            )

            return updatedAppointment[1][0]
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }
}


module.exports = new AppointmentService()
