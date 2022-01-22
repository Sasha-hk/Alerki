const {ClientProfileModel, WorkerProfileModel} = require('../db/models')
const WorkerWeekendDaysService = require('./WorkerWeekendDaysService')
const checkTypes = require('../utils/validators/checkTypes')
const checkParams = require('../utils/validators/checkParams')


class ProfileService {
    async findWorkerByID({id}) {
        checkTypes.hardNumber(Number(id), 'workerID')
        const foundWorker = await WorkerProfileModel.findOne({
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
        const newWeekendDays = await WorkerWeekendDaysService.create()
        const newWorkerProfile = await WorkerProfileModel.create({
            weekendDaysID: newWeekendDays.id
        })

        return newWorkerProfile.dataValues
    }

    async updateWorker({
        id,
        workingTimeFrom,
        workingTimeTo,
        shortBiography,
        instagramProfile
    }) {
        const updatedWorker = await WorkerProfileModel.update(
            {
                workingTimeFrom,
                workingTimeTo,
                shortBiography,
                instagramProfile,
            }, 
            {
                returning: true,
                where: {
                    id,
                },
            }
        )

        return updatedWorker[1][0]
    }
}


module.exports = new ProfileService()
