const AppointmentService = require('../service/AppointmentService')
const WorkerWeekendDaysService = require('../service/WorkerWeekendDaysService')
const WorkerScheduleService = require('../service/WorkerScheduleService')
const WorkerServiceService = require('../service/WorkerServicesService')
const ProfileService = require('../service/ProfileService')
const UserService = require('../service/UserService')
const APIError = require('../exception/APIError')
const checkParameters = require('../utils/checkParameters')
const oneExists = require('../utils/oneExists.js')


class AppointmentController {
    async clientDetails(req, res, next) {
        try {
            const slug = req.params.slug

            res.json('ok')
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientList(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientListToday(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientMakeAppointment(req, res, next) {
        try {
            const {
                workerID,
                workerServiceID,
                appointmentStartTime,
            } = req.body

            checkParameters({
                workerID,
                workerServiceID,
                appointmentStartTime,
            })
            
            const newAppointment = await AppointmentService.makeAppointment({
                clientID: req.accessToken.id,
                workerID,
                workerServiceID,
                appointmentStartTime: new Date(appointmentStartTime),
            })

            res.json(newAppointment)
        }
        catch(e) {
            console.log(e)
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientCancel(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerDetails(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerList(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerListToday(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerCancel(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerConfirm(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    } 
}


module.exports = new AppointmentController()
