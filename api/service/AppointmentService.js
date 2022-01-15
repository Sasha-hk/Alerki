const {AppointmentModel} = require('../db/models')
const {WorkerServiceModel} = requie('../db/models')
const AppointmentError = require('../exception/AppointmentError') 
const generateSlug = require('../utils/generateSlug')


class AppointmentService { 
    async clientDetails(slug) {
        const appointment = await AppointmentModel.findOne({
            raw: true,
            where: {
                slug,
            }
        })

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
        const orderDate = new Date(Date.now()).toISOString()
        
        orderDate.setDate(dateNow.getDate() - 1)

        const appointments = await AppointmentModel.findAll({
            raw: true,
            where: {
                appointmentTime: {
                    gt: orderDate,
                },
                clientID,
            },
        })
        appointmentTime.findAll()

        // filer appointments, return only active
        const resultAppointments = appointments.filter(apItem => {
            const filterDate = new Date(apItem.appointmentTime)
            filterDate.setDate(filterDate.getTime() + filterDate.duration)

            return filterDate < currentDate
        })

        return resultAppointments
    }

    async clientAppointmentsToday(date) {
        const orderDate = new Date(date)
        orderDate.setHours(0)
        orderDate.setMinutes(0)
        orderDate.setSeconds(0)
        orderDate.setMilliseconds(0)

        const appointmentsToday = await AppointmentModel.findAll({
            raw: true,
            where: {

                appointmentTime: {
                    gte: orderDate,
                },
                appointmentTime: {
                    lte: orderDate.setDate(orderDate.getDate() + 1),
                },
            }
        })

        return appointmentsToday
    }

    async makeAppointemnt(
        clientID,
        workerID,
        serviceID,
        appointmentTime,
    ) {
        if (!serviceID || !clientID || !workerID || !appointmentTime) {
            throw AppointmentError.BadRequestError([
                !clientID && 'clientID is required',
                !workerID && 'workerID is require',
                !serviceID && 'serviceID is required',
                !appointmentTime && 'appointmentTime is required'
            ].filter(e => e))
        }

        const slug = await generateSlug(AppointmentModel)

        const workerService = await WorkerServiceModel.findOne({
            raw: true,
            where: {
                id: serviceID,
            }
        })

        if (!workerService) {
            throw AppointmentError.BadRequest([
                `service with id ${serviceID} not found`
            ])
        }

        const newAppointment = await AppointmentModel.create({
            slug,
            clientID,
            workerID,
            serviceID,
            appointmentTime,
            diration: workerService.duration,
            confirmed: false,
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
}


module.exports = new AppointmentService()
