const {MasterServiceModel, MasterProfileModel} = require('../db/models')
const {isNumber, hardNumber} = require('../utils/validators/checkTypes')


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

    async find({
        serviceID, 
        limit, 
        page
    }) {
        // check if serviceID is number
        isNumber(Number(serviceID), 'serviceID')

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
        })

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
