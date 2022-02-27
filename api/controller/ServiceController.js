const ServiceService = require('../service/ServiceService')
const APIError = require('../exception/APIError')
const checkParams = require('../utils/validators/checkParams')


class ServiceController {
  async services(req, res, next) {
    try {
      const {limit, page} = req.query

      const foundServices = await ServiceService.services({
        limit,
        page,
      })

      res.json(foundServices)
    }
    catch(e) {
      console.log(e)
      res.status(e.status || 500).json(e)    
    }
  }

  async findByName(req, res, next) {
    try {
      const {name, limit, page} = req.query

      checkParams.all({name})

      const foundServices = await ServiceService.findByName({name, limit, page})

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

      checkParams.all({name})

      const newService = await ServiceService.create({name})

      res.json(newService)
    }
    catch(e) {
      res.status(e.status || 500).json(e.errors)
    }
  }
}


module.exports = new ServiceController()
