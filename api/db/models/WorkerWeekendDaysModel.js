module.exports = (sequelize, DataTypes) => {
    const WorkerWeekendDaysModel = sequelize.define(
        'WorkerWeekendDaysModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            monday: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            tuesday: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            wednesday: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            thursday: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            friday: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            saturday: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            sunday: {
                type: DataTypes.BOOLEAN,
                default: true
            },
        },
        {
            tableName: 'WorkerWeekendDays'
        }
    )

    return WorkerWeekendDaysModel
}