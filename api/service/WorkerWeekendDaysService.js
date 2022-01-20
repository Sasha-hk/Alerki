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
    async createWeekendDays({
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
    }) {
        const newWeekendDays = await WorkerWeekendDaysModel.create({
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        })

        return newWeekendDays.dataValues
    }

    async updateWeekendDays({
        id,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
    }) {
        const checkExists = await this.findWeekendDaysByID({id})

        if (!checkExists) {
            const newWeekendDays = await this.createWeekendDay({
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
            })
            
            return newWeekendDays
        }
        else {
            const updatedWeekendDays = await WorkerWeekendDaysModel.update(
                {
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday,
                },
                {
                    raw: true,
                    where: {
                        id
                    }
                }
            )

            return updatedWeekendDays
        }
    }
}


module.exports = new WorkerWeekendDaysService()
