const {WorkerScheduleModel} = require('../db/models')


class WorkerScheduleService {
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
}


module.exports = new WorkerScheduleService()
