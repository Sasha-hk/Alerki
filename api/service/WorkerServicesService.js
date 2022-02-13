const {MasterServiceModel, MasterProfileModel} = require('../db/models')
const {isNumber, hardNumber} = require('../utils/validators/checkTypes')


class WorkerServiceService {
    async create({
        currency,
        price,
        location,
        duration,
        workerID,
        serviceID
    }) {
        const newWorkerService = await MasterServiceModel.create({
            currency,
            price,
            location,
            duration,
            workerID,
            serviceID,
        })

        return newWorkerService.dataValues
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

    async findForWorker({
        workerID
    }) {
        hardNumber(Number(workerID), 'workerID')

        const foundServices = await MasterServiceModel.findAll({
            raw: true,
            where: {
                workerID,
            },
        })

        return foundServices
    }

    async findByID({id}) {
        const workerService = await MasterServiceModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return workerService
    }
}


module.exports = new WorkerServiceService()
