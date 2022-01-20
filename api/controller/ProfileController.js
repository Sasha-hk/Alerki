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
                workersResult.push({worker: foundWorker[0], workerService: w})
            }

            if (workersResult.length == 0) {
                throw APIError.NotFoundError()
            }
            console.log(workersResult) 
            res.json(workersResult)
        }
        catch(e) {
            console.log(e)
            res.status(e.status || 500).json(e.errors)
        }
    }

    async getSchedule(req, res, next) {
        try {
            const from = req.query.from
            const to = req.query.to
            const workerProfileID = req.query.worker_id
            
            const workingDays = await WorkerWeekendDaysService.findWeekendDaysByID(workerProfileID)
            const foundSchedules = await WorkerScheduleService.getSchedule({
                dateRange: [from, to],
                workerProfileID,
            })

            return {
                workingDays,
                foundSchedules
            }
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new ProfileController()
