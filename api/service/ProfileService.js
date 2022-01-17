const {ClientProfileModel, WorkerProfileModel} = require('../db/models')

class ProfileService {
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
