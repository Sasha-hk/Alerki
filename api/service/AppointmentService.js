const {AppointmentModel} = require('../db/models')
const {WorkerServiceModel} = require('../db/models')
const AppointmentError = require('../exception/AppointmentError') 
const generateSlug = require('../utils/generateSlug')


class AppointmentService { 
    async getDetails(slug) {
        const appointment = await AppointmentModel.findOne({
            raw: true,
            where: {
                slug,
            }
        })

        return appointment
    }

    async clientDetails(slug) {
        const appointment = await this.getDetails(slug)

        if (appointment) {
            return appointment
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }

    async clientAppointmentList(clientID, currentDate) {
        if (!clientID || !currentDate) {
            throw AppointmentError.BadRequestError([
                !clientID && 'clientID is required',
                !currentDate && 'currentDate is required'
            ].filter(e => e))
        }

        const orderDate = new Date(currentDate)

        const appointments = await AppointmentModel.findAll({
            raw: true,
            where: {
                clientID,
                appointmentEndTime: {
                    gt: orderDate,
                },
            },
        })
        
        return appointments
    }

    async clientAppointmentsToday(clientID, date) {
        const orderDate = new Date(date)
        orderDate.setHours(0)
        orderDate.setMinutes(0)
        orderDate.setSeconds(0)
        orderDate.setMilliseconds(0)

        const appointmentsToday = await AppointmentModel.findAll({
            raw: true,
            where: {
                clientID,
                appointmentTime: {
                    between: [
                        orderDate,
                        orderDate.setDate(orderDate.getDate() + 1)
                    ],
                },
            }
        })

        return appointmentsToday
    }

    async makeAppointemnt(
        clientID,
        workerID,
        workerServiceID,
        appointmentTime,
    ) {
        if (!workerServiceID || !clientID || !workerID || !appointmentTime) {
            throw AppointmentError.BadRequestError([
                !clientID && 'clientID is required',
                !workerID && 'workerID is require',
                !workerServiceID && 'serviceID is required',
                !appointmentTime && 'appointmentTime is required'
            ].filter(e => e))
        }

        const workerService = await WorkerServiceModel.findOne({
            raw: true,
            where: {
                id: workerServiceID,
            }
        })
        
        if (!workerService) {
            throw AppointmentError.BadRequest([
                'service with id specefied not found'
            ])
        }

        const slug = await generateSlug(AppointmentModel)

        const appointmentStartTime = new Date(appointmentTime) 

        appointmentEndTime = new Date(
            appointmentStartTime.getTime() / 1000 + workerService.duration
        )

        const newAppointment = await AppointmentModel.create({
            slug,
            appointmentStartTime,
            appointmentEndTime,
            duration: workerService.duration,
            confirmed: false,
            clientID,
            workerID,
            workerServiceID,
        })

        // generate notification
        // send notification for worker
        // make these function later

        return newAppointment
    }

    async clientCancel(slug) {
        const updated = await AppointmentModel.update(
            {
                confirmed: false,
            },
            {
                raw: true,
                where: {
                    slug,
                }
            }
        )

        if (updated) {
            return updated
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }

    async workerDetails(slug) {
        const appointment = await this.getDetails(slug)

        if (appointment) {
            return appointment
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }

    async workerList(workerID, currentDate) {
        if (!workerID || !currentDate) {
            throw AppointmentError.BadRequestError([
                !clientID && 'clientID is required',
                !currentDate && 'currentDate is required'
            ].filter(e => e))
        }

        const orderDate = new Date(currentDate)

        const appointments = await AppointmentModel.findAll({
            raw: true,
            where: {
                appointmentEndTime: {
                    gt: orderDate,
                },
                workerID,
            },
        })
        
        return appointments
    }

    async workerAppointmentsToday(workerID, date) {
        const startDate = new Date(date)
        orderDate.setHours(0)
        orderDate.setMinutes(0)
        orderDate.setSeconds(0)
        orderDate.setMilliseconds(0)

        const appointmentsToday = await AppointmentModel.findAll({
            raw: true,
            where: {
                workerID,
                appointmentStartTime: {
                    between: [
                        startDate,
                        startDate.setDate(startDate.getDate() + 1),
                    ],
                },
            }
        })

        return appointmentsToday
    }

    async workerCancel(slug) {
        const toCancel = await AppointmentModel.update(
            {
                confirmed: false,
            },
            {
                raw: true,
                where: {
                    slug,
                },
            }
        )


        // make notification for client
        // send notofication for client
        

        if (toCancel) {
            return toCancel
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }

    async workerConfirm(slug) {
        const toCancel = await AppointmentModel.update(
            {
                confirmed: true,
            },
            {
                raw: true,
                where: {
                    slug,
                },
            }
        )

        // make notification for client
        // send notofication for client

        if (toCancel) {
            return toCancel
        }
        else {
            throw AppointmentError.NotFoundError()
        }
    }
}


module.exports = new AppointmentService()
