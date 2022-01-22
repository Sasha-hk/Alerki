const {WorkerScheduleModel} = require('../db/models')


class WorkerScheduleService {
    async checkExists({
        workerID,
        date,
    }) {
        const foundSchedule = await WorkerScheduleModel.findOne({
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
        workingTimeFrom,
        workingTimeTo,
        weekendDay,
        date,
    }) {
        const newSchedule = await WorkerScheduleModel.create({
            workerID,
            workingTimeFrom,
            workingTimeTo,
            weekendDay,
            date,
        })

        return newSchedule.dataValues
    }
    
    async getInRange({
        workerID,
        dateRange,
    }) {
        const foundSchedule = await WorkerScheduleModel.findAll({
            raw: true,
            where: {
                workerID,
                date: {
                    between: dateRange,
                }
            }
        })

        return foundSchedule    
    }

    async update({
        workerID,
        workingTimeFrom,
        workingTimeTo,
        weekendDay,
        date,
    }) {
        const checkExistsSchedule = await this.checkExistsSchedule({
            workerID,
            date
        })

        if (!checkExistsSchedule) {
            const newSchedule = await this.createSchedule({
                workerID,
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
                        workerID,
                        date,
                    }
                }
            )

            return updatedSchedule
        }
    }
}


module.exports = new WorkerScheduleService()
