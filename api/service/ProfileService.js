const {ClientProfileModel, MasterProfileModel} = require('../db/models')
const MasterWeekendDaysService = require('./MasterWeekendDaysService')
const UserService = require('./UserService')
const UserPictureService = require('./UserPictureService')
const checkTypes = require('../utils/validators/checkTypes')
const checkParams = require('../utils/validators/checkParams')


class ProfileService {
    async findMasterByID({id}) {
        checkTypes.hardNumber(Number(id), 'masterID')
        const foundMaster = await MasterProfileModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return foundMaster
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

    async createMasterProfile() {
        const newWeekendDays = await MasterWeekendDaysService.create()
        const newMasterProfile = await MasterProfileModel.create({
            weekendDaysID: newWeekendDays.id
        })

        return newMasterProfile.dataValues
    }

    async updateMaster({
        id,
        workingStartTime,
        workingEndTime,
        shortBiography,
        instagramProfile,
    }) {
        await MasterProfileModel.update(
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

        const updatedMaster = await MasterProfileModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return updatedMaster
    }

    async makeNotAvailableMaster({id}) {
        const candedat = await this.findMasterByID({id})

        if (candedat) {
            const blockedMaster = await MasterProfileModel.update(
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

    async makeAvailableMaster({id}) {
        const candedat = await this.findMasterByID({id})

        if (candedat) {
            const blockedMaster = await MasterProfileModel.update(
                {
                    available: true,
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
