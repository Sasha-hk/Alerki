const {WorkerServiceModel} = require('../db/models')
const {isNumber} = require('../utils/validators/checkTypes')


class WorkerServiceService {
    async find({serviceID}) {
        // check if serviceID is number
        isNumber(Number(serviceID), 'serviceID')

        const foundServices = await WorkerServiceModel.findAll({
            raw: true,
            where: {
                serviceID,
            },
        })

        return foundServices
    }
    
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
}


module.exports = new WorkerServiceService()
