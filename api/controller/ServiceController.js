const ServiceService = require('../service/ServiceService')
const oneExists = require('../utils/oneExists')



class ServiceController {
    async findByName(req, res, next) {
        try {
            const {name, limit, page} = req.query

            const foundServices = await ServiceService.findByName(name, limit, page)

            res.json(foundServices)
        }
        catch(e) {
            res.status(e.ststus || 500).json(e)    
        }
    }

    async createService(req, res, next) {
        try {
            const {name} = req.body

            oneExists({name})

            const newService = await ServiceService.createService(name)

            res.json(newService)
        }
        catch(e) {
            res.status(e.ststus || 500).json(e)
        }
    }
}


module.exports = new ServiceController()
