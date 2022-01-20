const {WorkerScheduleModel} = require('../db/models')


class WorkerScheduleService {
    async checkExistsSchedule({
        workerProfileID,
        date,
    }) {
        const foundSchedule = await WorkerScheduleModel.findOne({
            raw: true,
            where: {
                workerProfileID,
                date
            }
        })
    
        return foundSchedule
    }

    async createSchedule({
        workerProfileID,
        workingTimeFrom,
        workingTimeTo,
        weekendDay,
        date,
    }) {
        const newSchedule = await WorkerScheduleModel.create({
            workerProfileID,
            workingTimeFrom,
            workingTimeTo,
            weekendDay,
            date,
        })

        return newSchedule.dataValues
    }
    
    async getSchedule({
        dateRange,
        workerProfileID,
    }) {
        const foundSchedule = await WorkerScheduleModel.findAll({
            raw: true,
            where: {
                workerProfileID,
                date: {
                    between: dateRange,
                }
            }
        })

        return foundSchedule    
    }

    async updateSchedule({
        workerProfileID,
        workingTimeFrom,
        workingTimeTo,
        weekendDay,
        date,
    }) {
        const checkExistsSchedule = await this.checkExistsSchedule({
            workerProfileID,
            date
        })

        if (!checkExistsSchedule) {
            const newSchedule = await this.createSchedule({
                workerProfileID,
                workingTimeFrom,
                workingTimeTo,
                weekendDay,
                date,
            })

            return newSchedule
        }
        else {
            const updatedSchedule = await WorkerScheduleModel.update(
                {
                    workingTimeFrom,
                    workingTimeTo,
                    weekendDay,
                },
                {
                    where: {
                        workerProfileID,
                        date,
                    }
                }
            )

            return updatedSchedule
        }
    }
}


module.exports = new WorkerScheduleService()
