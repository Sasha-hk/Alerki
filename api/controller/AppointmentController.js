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

    async clientGetDay(req, res, next) {
        try {
            const date = req.query.date
    
            checkParams.all({
                date
            })

            const dayAppointments = await AppointmentService.clientGetDay({
                clientID: req.accessToken.clientID, 
                date,
            })

            res.json(dayAppointments)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async clientFromNow(req, res, next) {
        try {
            const now = req.query.now

            checkParams.all({
                now,
            })

            const foundAppointments = await AppointmentService.clientFromNow({
                clientID: req.accessToken.clientID,
                now,
            })

            res.json(foundAppointments)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerGetDay(req, res, next) {
        try {
            const date = req.query.date
    
            checkParams.all({
                date
            })

            const dayAppointments = await AppointmentService.workerGetDay({
                workerID: req.accessToken.workerID, 
                date,
            })

            res.json(dayAppointments)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerFromNow(req, res, next) {
        try {
            const now = req.query.now

            checkParams.all({
                now,
            })

            const foundAppointments = await AppointmentService.workerFromNow({
                workerID: req.accessToken.workerID,
                now,
            })

            res.json(foundAppointments)
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
            const slug = req.params.slug

            checkParams.all({
                slug
            })

            const updatedAppointment = await AppointmentService.clientCancel({
                clientID: req.accessToken.clientID,
                slug,
            })

            res.json(updatedAppointment)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerCancel(req, res, next) {
        try {
            const slug = req.params.slug

            checkParams.all({
                slug
            })

            const updatedAppointment = await AppointmentService.workerCancel({
                workerID: req.accessToken.workerID,
                slug
            })
            
            res.json(updatedAppointment)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }

    async workerConfirm(req, res, next) {
        try {
            const slug = req.params.slug

            checkParams.all({
                slug
            })

            const updatedAppointment = await AppointmentService.workerConfirm({
                workerID: req.accessToken.workerID,
                slug
            })
            
            res.json(updatedAppointment)
        }
        catch (e) {
            res.status(e.status || 500).json(e.errrors)
        }
    }
}


module.exports = new AppointmentController()
