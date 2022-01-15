const {AppointmentModel} = require('../db/models')
const {WorkerServiceModel} = requie('../db/models')
const AppointmentError = require('../exception/AppointmentError') 
const generateSlug = require('../utils/generateSlug')


class AppointmentService { 
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

    async clientAppointmentList(
        clientID,
        currentDate,
    ) {
        if (!clientID || !currentDate) {
            throw AppointmentError.BadRequestError([
                !clientID && 'clientID is required',
                !currentDate && 'currentDate is required'
            ].filter(e => e))
        }
        const dateNow = new Date(Date.now()).toISOString()
        
        dateNow.setDate(dateNow.getDate() - 1)

        const appointments = AppointmentModel.findAll({
            raw: true,
            where: {
                appointmentTime: dateNow,
                clientID
            },
        })

        const resultAppointments = appointments.filter(apItem => {
            const filterDate = new Date(apItem.appointmentTime)
            filterDate.setDate(filterDate.getTime() + filterDate.duration)

            return filterDate < currentDate
        })

        return resultAppointments

    }

}


module.exports = new AppointmentService()
