const {WorkerWeekendDaysModel} = require('../db/models')


class WorkerWeekendDaysService {
    async findWeekendDaysByID({id}) {
        const foundDays = await WorkerWeekendDaysModel.findOne({
            raw: true,
            where: {
                id,
            }
        })

        return foundDays
    }
    async createWeekendDays() {
        const newWeekendDays = await WorkerWeekendDaysModel.create()

        return newWeekendDays.dataValues
    }

    async updateWeekendDays() {

    }
}


module.exports = new WorkerWeekendDaysService()
