const ServiceService = require('../service/ServiceService')
const APIError = require('../exception/APIError')
const checkParameters = require('../utils/checkParameters')


class ServiceController {
    async findByName(req, res, next) {
        try {
            const {name, limit, page} = req.query

            checkParameters({name})

            const foundServices = await ServiceService.findByName(name, limit, page)

            if (foundServices.length == 0) {
                throw APIError.NotFoundError()
            }

            res.json(foundServices)
        }
        catch(e) {
            res.status(e.status || 500).json(e)    
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body

            checkParameters({name})

            const newService = await ServiceService.createService(name)

            res.json(newService)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new ServiceController()
