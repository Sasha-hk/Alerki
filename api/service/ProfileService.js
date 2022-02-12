const {ClientProfileModel, WorkerProfileModel} = require('../db/models')
const WorkerWeekendDaysService = require('./WorkerWeekendDaysService')
const UserService = require('./UserService')
const UserPictureService = require('./UserPictureService')
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

    async findClientByID({id}) {
        const foundClient = await ClientProfileModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return foundClient
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
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
    }) {
        await WorkerProfileModel.update(
            {
                workingStartTime,
                workingEndTime,
                shortBiography,
                instagramProfile,
            }, 
            {
                where: {
                    id,
                },
            }
        )

        const updatedWorker = await WorkerProfileModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return updatedWorker
    }

    async blockMaster({id}) {
        const candedat = await this.findWorkerByID({id})

        if (candedat) {
            const blockedMaster = await WorkerProfileModel.update(
                {
                    available: false,
                },
                {
                    raw: true,
                    returning: true,
                    where: {
                        id,
                    },
                }
            )
            return blockedMaster[1][0]
        }
    }
}


module.exports = new ProfileService()
