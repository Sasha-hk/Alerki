const {AppointmentModel} = require('../db/models')
const WorkerServicesService = require('./WorkerServicesService')
const WorkerScheduleService = require('./WorkerScheduleService')
const ProfileService = require('./ProfileService')
const WorkerWeekendDaysService = require('./WorkerWeekendDaysService')
const generateSlug = require('../utils/generateSlug')
const AppointmentError = require('../exception/AppointmentError')


const weekDays = ['monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

class AppointmentService { 
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
                    between: [startTime, endTime],
                },
            }
        })

        const byEndTime = await AppointmentModel.findAll({
            raw: true,
            where: {
                workerID,
                appointmentEndTime: {
                    between: [startTime, endTime]
                }
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

    async checkScheduleDays({
        workerID,
        appointmentStartTime
    }) {
        const workerSchedule = await WorkerScheduleService.findByWorkerID({workerID})

        if (workerSchedule) {
            console.log('there are few schedules')
        }
    }

    async checkWorkingTime({
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
            (worker.workingStartTime < toMilliseconds || worker.workingEndTime < toMilliseconds) &&
            (worker.workingEndTime > toMilliseconds || worker.workingEndTime > toMilliseconds)
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
        workerServiceID,
        clientID,
        appointmentStartTime,
    }) {
        // get worker and check if it is exists
        const worker = await ProfileService.findWorkerByID({id: workerID})

        if (!worker) {
            throw AppointmentError.WorkerNotFoundError()
        }

        // get worker service and check if it is exists
        const workerService = await WorkerServicesService.findByID({id: workerServiceID})
       
        if (!workerService) {
            throw AppointmentError.ServiceNotFoundError()
        }

        // generate needed data
        const slug = await generateSlug(AppointmentModel)
        const appointmentEndTime = new Date(appointmentStartTime)
        appointmentEndTime.setTime(appointmentEndTime.getTime() + workerService.duration)

        // checks
        this.checkWorkingTime({
            appointmentStartTime,
            appointmentEndTime,
            worker,
        })
        await this.checkEntryAppointments({
            startTime: appointmentStartTime, 
            endTime: appointmentEndTime,
            workerID,
        })

        await this.checkWeekendDays({
            weekendDaysID: worker.weekendDaysID,
            appointmentStartTime,
        })

        await this.checkScheduleDays({
            workerID: worker.id,
            appointmentStartTime
        })

        // create appointment
        const newAppointment = await AppointmentModel.create({
            slug,
            workerID,
            workerServiceID,
            clientID,
            duration: workerService.duration,
            appointmentStartTime,
            appointmentEndTime,
        })

        return newAppointment.dataValues
    }
}


module.exports = new AppointmentService()
