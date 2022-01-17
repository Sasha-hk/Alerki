const WorkerServiceService = require('../service/WorkerServicesService')
const ServiceService = require('../service/ServiceService')
const AuthService = require('../service/AuthService')
const UserService = require('../service/UserService')
const AuthError = require('../exception/AuthError')
const APIError = require('../exception/APIError')


class ProfileController {
    async createWorkerService(req, res, next) {
        try {
            const {name, currency, price, location, duration} = req.body

            if (!name || !currency || !price || !location || !duration) {
                throw APIError.BadRequestError(['required data not specefied'])
            }

            const {accessToken} = req.cookies

            if (!accessToken) {
                throw AuthError.UnauthorizedError()
            }

            const decodedToken = await AuthService.verifyAccessToken(accessToken)

            const user = await UserService.findOneByID(decodedToken.id)

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
            console.log(e)
            res.status(e.status || 500).json(e)    
        }
    }
}


module.exports = new ProfileController()
