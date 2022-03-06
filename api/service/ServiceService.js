const {Sequelize, ServiceModel} = require('../db/models')


class ServiceService {
  async findByID({id}) {
    const result = await ServiceModel.findAll({
      raw: true,
      where: {
        id,
      },
    })

    return result
  }
  async findByName({name, limit, page}) {
    const results = await ServiceModel.findAll({
      raw: true,
      attributes: [
        'id',
        'name',
      ],
      where: {
        available: true,
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
      where: {
        available: true,
      },
      offset: page ? page * limit : 0,
      limit: limit || 24,
    })

    return services
  }

  async makeNotAvailable({id}) {
    ServiceModel.update(
      {
        available: false,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  async makeAvailable({id}) {
    ServiceModel.update(
      {
        available: true,
      },
      {
        where: {
          id,
        },
      }
    )
  }
}


module.exports = new ServiceService()
