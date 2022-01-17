const {ClientProfileModel, WorkerProfileModel} = require('../db/models')

class ProfileService {
    async findWorkerByID(id) {
        const foundWorker = await WorkerProfileModel.findAll({
            raw: true,
            where: {
                id,
            },
        })

        return foundWorker
    }

    async findClientByID(id) {
        const foundWorker = await ClientProfileModel({
            raw: true,
            where: {
                id,
            },
        })

        return foundWorker
    }

    async createClientProfile() {
        const newClientProfile = await ClientProfileModel.create()

        return newClientProfile.dataValues
    }

    async createWorkerProfile() {
        const newWorkerProfile = await WorkerProfileModel.create()

        return newWorkerProfile.dataValues
    }
}


module.exports = new ProfileService()
