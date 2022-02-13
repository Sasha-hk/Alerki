const {MasterScheduleModel, Sequelize} = require('../db/models')


class MasterScheduleService {
    async checkExists({
        workerID,
        date,
    }) {
        const foundSchedule = await MasterScheduleModel.findOne({
            raw: true,
            where: {
                workerID,
                date
            }
        })
    
        return foundSchedule
    }

    async create({
        workerID,
        workingStartTime,
        workingEndTime,
        weekendDay,
        date,
    }) {
        const newSchedule = await MasterScheduleModel.create({
            workerID,
            workingStartTime,
            workingEndTime,
            weekendDay,
            date,
        })

        return newSchedule.dataValues
    }

    async findByMasterID({workerID}) {
        const foundSchedule = await MasterScheduleModel.findOne({
            raw: true,
            where: {
                workerID,
            }
        })

        return foundSchedule
    }


    async findByMasterIDAndDate({workerID, date}) {
        const foundSchedule = await MasterScheduleModel.findOne({
            raw: true,
            where: {
                workerID,
                date,
            }
        })

        return foundSchedule
    }
    
    async getInRange({
        workerID,
        dateRange,
    }) {
        const foundSchedule = await MasterScheduleModel.findAll({
            raw: true,
            where: {
                workerID,
                date: {
                    [Sequelize.Op.between]: dateRange,
                }
            }
        })

        return foundSchedule    
    }

    async updateOrCreate({
        workerID,
        workingStartTime,
        workingEndTime,
        weekendDay,
        date,
    }) {
        const checkExistsSchedule = await this.checkExists({
            workerID,
            date
        })

        if (!checkExistsSchedule) {
            const newSchedule = await this.create({
                workerID,
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
                        workerID,
                        date,
                    }
                }
            )

            return updatedSchedule
        }
    }
}


module.exports = new MasterScheduleService()
