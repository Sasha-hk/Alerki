const {WorkerServiceModel} = require('../db/models')


class WorkerServiceService {
    async findService(serviceID) {
        const foundServices = await WorkerServiceModel.findAll({
            raw: true,
            where: {
                serviceID,
            },
        })

        return foundServices
    }
    async createWorkerService(
        name,
        currency,
        price,
        location,
        duration,
        workerID,
        serviceID
    ) {
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
