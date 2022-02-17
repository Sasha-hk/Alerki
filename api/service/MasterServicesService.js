const {MasterServiceModel, MasterProfileModel, ServiceModel} = require('../db/models')
const {isNumber, hardNumber} = require('../utils/validators/checkTypes')
const APIError = require('../exception/APIError')


class MasterServiceService {
  async create({
    currency,
    price,
    location,
    duration,
    masterID,
    serviceID
  }) {
    const newMasterService = await MasterServiceModel.create({
      currency,
      price,
      location,
      duration,
      masterID,
      serviceID,
    })

    return newMasterService.dataValues
  }

  async update({
    id,
    name,
    currency,
    price,
    location,
    duration,
    masterID,
    serviceID,
  }) {
    const candedat = await this.findByID({id})

    if (candedat && candedat.masterID == masterID) {
      await MasterServiceModel.update(
        {
          name,
          currency,
          price,
          location,
          duration,
          serviceID,
        },
        {
          where: {
            id,
            masterID,
          },
        }
      )
 
      const updatedService = await MasterServiceModel.findOne({
        raw: true,
        where: {
          id
        },
        include: {
          model: ServiceModel, 
          as: 'service', 
          attributes: ['name']
        },
      })

      updatedService.name = updatedService['service.name']
      delete updatedService['service.name']

      return updatedService
    }

    throw APIError.NotFoundError('service with specefied id not exists or it is not belongs to you')
  }

  async delete({
    id,
    masterID,
  }) {
    hardNumber(Number(masterID), 'serviceID')
    const candedat = await this.findByID({id})

    if (candedat && candedat.masterID == masterID) {
      return await MasterServiceModel.destroy({
        where: {
          id,
          masterID,
        }
      })
    }

    throw APIError.NotFoundError('service with specefied id not exists')
  }

  async find({
    serviceID, 
    limit, 
    page
  }) {
    // check if serviceID is number
    hardNumber(Number(serviceID), 'serviceID')

    const foundServices = await MasterServiceModel.findAll({
      raw: true,
      where: {
        serviceID,
      },
      offset: page ? page * limit : 0,
      limit: limit || 24,
    })

    return foundServices
  }

  async findForMaster({
    masterID
  }) {
    hardNumber(Number(masterID), 'masterID')

    const foundServices = await MasterServiceModel.findAll({
      raw: true,
      where: {
        masterID,
      },
      include: {model: ServiceModel, as: 'service', attributes: ['name']}
    })

    for (let i = 0; i < foundServices.length; i++) {
      foundServices[i].name = foundServices[i]['service.name']
      delete foundServices[i]['service.name']
    }

    return foundServices
  }

  async findByID({id}) {
    const masterService = await MasterServiceModel.findOne({
      raw: true,
      where: {
        id,
      },
    })

    return masterService
  }
}


module.exports = new MasterServiceService()
