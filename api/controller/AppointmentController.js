const AppointmentService = require('../service/AppointmentService')
const UserService = require('../service/UserService')
const checkParams = require('../utils/validators/checkParams')
const AppointmentError = require('../exception/AppointmentError')


class AppointmentController {
    async details(req, res, next) {
        try {
            const slug = req.params.slug


            checkParams.all({slug})

            const details = await AppointmentService.details({slug})

            if (!details) {
                throw AppointmentError.NotFoundError()
            }

            res.json(details)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async clientFor(req, res, next) {
        try {
            // const for_time = req.query.for_time

            // checkParams.all({
            //     for_time
            // })
            // const forTime = new Date(for_time)
            // forTime.setHours(0)
            // forTime.setMinutes(0)
            // forTime.setSeconds(0)
            // forTime.setMilliseconds(1)

            // const foundAppointments = await AppointmentService.clientFor({
            //     clientID: req.accessToken.clientID, 
            //     forTime,
            // })

            // res.json(foundAppointments)
        }
        catch (e) {
            console.log(e)
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async clientFromNow(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientToday(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerFor(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerFromNow(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerToday(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async create(req, res, next) {
        try {
            const user = await UserService.findUserByID({id: req.accessToken.id})
            const {
                workerID,
                workerServiceID,
                appointmentStartTime,
            } = req.body
            
            checkParams.all({
                workerID,
                workerServiceID,
                appointmentStartTime
            })

            // check if user make appointment to herself
            if (workerID == user?.workerID) {
                throw AppointmentError.ForHimselfError()
            }

            const newAppointment = await AppointmentService.create({
                workerID,
                workerServiceID,
                clientID: user.clientID,
                appointmentStartTime: new Date(appointmentStartTime),
            })

            res.json(newAppointment)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientCancel(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerCancel(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerConfirm(req, res, next) {
        try {

        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }
}


module.exports = new AppointmentController()
