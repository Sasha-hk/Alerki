const {WorkerServiceModel, WorkerProfileModel} = require('../db/models')
const {isNumber} = require('../utils/validators/checkTypes')


class WorkerServiceService {
    async create({
        currency,
        price,
        location,
        duration,
        workerID,
        serviceID
    }) {
        const newWorkerService = await WorkerServiceModel.create({
            currency,
            price,
            location,
            duration,
            workerID,
            serviceID,
        })

        return newWorkerService.dataValues
    }

    async find({serviceID, limit, page}) {
        // check if serviceID is number
        isNumber(Number(serviceID), 'serviceID')

        const foundServices = await WorkerServiceModel.findAll({
            raw: true,
            where: {
                serviceID,
            },
            offset: page ? page * limit : 0,
            limit: limit || 24,
        })

        return foundServices
    }

    async findByID({id}) {
        const workerService = await WorkerServiceModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return workerService
    }
}


module.exports = new WorkerServiceService()
