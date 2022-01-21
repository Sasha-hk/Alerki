const WorkerWeekendDaysService = require('../service/WorkerWeekendDaysService')
const WorkerScheduleService = require('../service/WorkerScheduleService')
const WorkerServiceService = require('../service/WorkerServicesService')
const ProfileService = require('../service/ProfileService')
const ServiceService = require('../service/ServiceService')
const UserService = require('../service/UserService')
const AuthError = require('../exception/AuthError')
const APIError = require('../exception/APIError')
const checkParameters = require('../utils/checkParameters')
const oneExists = require('../utils/oneExists.js')


class ProfileController {
    async createWorkerService(req, res, next) {
        try {
            const {name, currency, price, location, duration} = req.body

            checkParameters({
                name,
                currency,
                price,
                location,
                duration,
            })

            const {accessToken} = req.cookies

            if (!accessToken) {
                throw AuthError.UnauthorizedError()
            }

            const decodedToken = req.accessToken
            
            const user = await UserService.findUserByID(decodedToken.id)

            // return existed or create service
            const existsOrCreated = await ServiceService.createService(name)

            // create new worker service
            const newWorkerService = await WorkerServiceService.createWorkerService({
                name, 
                currency,
                price,
                location,
                duration,
                workerID: user.workerProfileID,
                serviceID: existsOrCreated.id,
            })

            res.json(newWorkerService)
        }
        catch(e) {
            res.status(e.status || 500).json(e)    
        }
    }

    async findWorker(req, res, next) {
        try {
            const {serviceID} = req.query

            oneExists({serviceID})

            let workersResult = []
            const workerServices = await WorkerServiceService.findService(serviceID)

            if (workerServices.length == 0) {
                throw APIError.NotFoundError()
            }

            for (const w of workerServices) {
                const foundWorker = await ProfileService.findWorkerByID(w.workerID)
                workersResult.push({...foundWorker[0], service: w})
            }

            if (workersResult.length == 0) {
                throw APIError.NotFoundError()
            }
            res.json(workersResult)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async getSchedule(req, res, next) {
        try {
            const year = req.query.year
            const month = req.query.month
            const workerProfileID = req.query.worker_id
            const weekendDaysID = req.query.weekendDaysID
            checkParameters({
                year,
                month,
                workerProfileID,
                weekendDaysID,
            })

            const from = new Date()
            from.setFullYear(year)
            from.setMonth(month)
            from.setDate(0)
            from.setTime(0)
            from.setHours(0)
            from.setMinutes(0)
            from.setSeconds(0)
            from.setMilliseconds(0)
            const to = new Date(from.getFullYear(), from.getMonth()+1, 0);

            const workingDays = await WorkerWeekendDaysService.findWeekendDaysByID({id: weekendDaysID})
            const foundSchedules = await WorkerScheduleService.getSchedule({
                dateRange: [from, to],
                workerProfileID,
            })

            res.json({
                workingDays,
                foundSchedules
            })
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new ProfileController()
