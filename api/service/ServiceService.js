const {Sequelize, ServiceModel} = require('../db/models')


class ServiceService {
  async findByName({name, limit, page}) {
    const results = await ServiceModel.findAll({
      raw: true,
      attributes: [
        'id',
        'name',
      ],
      where: {
        name: {
          [Sequelize.Op.like]: name,
        },
      },
      offset: page ? page * limit : 0,
      limit: limit || 50,
    })

    return results
  }

  async findOneByName({name}) {
    const results = await ServiceModel.findOne({
      raw: true,
      where: {
        name,
      },
    })

    return results
  }

  async create({name}) {
    const candedat = await this.findOneByName({name})

    if (!candedat) {
      const newService = await ServiceModel.create({name})
      
      return newService.dataValues
    }

    return candedat
  }

  async findOrCreateByName({name}) {
    const candedat = await this.findOneByName({name})

    if (!candedat) {
      const newService = await this.create({name})

      return newService
    }

    return candedat
  }
  
  async services({limit, page}) {
    const services = await ServiceModel.findAll({
      raw: true,
      offset: page ? page * limit : 0,
      limit: limit || 24,
    })

    return services
  }
}


module.exports = new ServiceService()
