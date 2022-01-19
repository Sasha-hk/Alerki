const WorkerServiceService = require('../service/WorkerServicesService')
const ServiceService = require('../service/ServiceService')
const UserService = require('../service/UserService')
const AuthError = require('../exception/AuthError')
const APIError = require('../exception/APIError')
const checkParameters = require('../utils/checkParameters')


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
            const newWorkerService = await WorkerServiceService.createWorkerService(
                name, 
                currency,
                price,
                location,
                duration,
                user.workerProfileID,
                existsOrCreated.id,
            )

            res.json(newWorkerService)
        }
        catch(e) {
            res.status(e.status || 500).json(e)    
        }
    }
}


module.exports = new ProfileController()
