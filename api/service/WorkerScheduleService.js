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
        workingStartTime,
        workingEndTime,
        weekendDay,
        date,
    }) {
        const newSchedule = await WorkerScheduleModel.create({
            workerID,
            workingStartTime,
            workingEndTime,
            weekendDay,
            date,
        })

        return newSchedule.dataValues
    }

    async findByWorkerID({workerID}) {
        const foundSchedule = await WorkerScheduleModel.findOne({
            raw: true,
            where: {
                workerID,
            }
        })

        return foundSchedule
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
            const updatedSchedule = await WorkerScheduleModel.update(
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


module.exports = new WorkerScheduleService()
