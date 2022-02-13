const {MasterScheduleModel, Sequelize} = require('../db/models')


class MasterScheduleService {
    async checkExists({
        masterID,
        date,
    }) {
        const foundSchedule = await MasterScheduleModel.findOne({
            raw: true,
            where: {
                masterID,
                date
            }
        })
    
        return foundSchedule
    }

    async create({
        masterID,
        workingStartTime,
        workingEndTime,
        weekendDay,
        date,
    }) {
        const newSchedule = await MasterScheduleModel.create({
            masterID,
            workingStartTime,
            workingEndTime,
            weekendDay,
            date,
        })

        return newSchedule.dataValues
    }

    async findByMasterID({masterID}) {
        const foundSchedule = await MasterScheduleModel.findOne({
            raw: true,
            where: {
                masterID,
            }
        })

        return foundSchedule
    }


    async findByMasterIDAndDate({masterID, date}) {
        const foundSchedule = await MasterScheduleModel.findOne({
            raw: true,
            where: {
                masterID,
                date,
            }
        })

        return foundSchedule
    }
    
    async getInRange({
        masterID,
        dateRange,
    }) {
        const foundSchedule = await MasterScheduleModel.findAll({
            raw: true,
            where: {
                masterID,
                date: {
                    [Sequelize.Op.between]: dateRange,
                }
            }
        })

        return foundSchedule    
    }

    async updateOrCreate({
        masterID,
        workingStartTime,
        workingEndTime,
        weekendDay,
        date,
    }) {
        const checkExistsSchedule = await this.checkExists({
            masterID,
            date
        })

        if (!checkExistsSchedule) {
            const newSchedule = await this.create({
                masterID,
                workingStartTime,
                workingEndTime,
                weekendDay,
                date,
            })

            return newSchedule
        }
        else {
            const updatedSchedule = await MasterScheduleModel.update(
                {
                    workingStartTime,
                    workingEndTime,
                    weekendDay,
                },
                {
                    where: {
                        masterID,
                        date,
                    }
                }
            )

            return updatedSchedule
        }
    }
}


module.exports = new MasterScheduleService()
