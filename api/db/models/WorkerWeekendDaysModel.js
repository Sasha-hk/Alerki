module.exports = (sequelize, DataTypes) => {
    const WorkerWeekendDaysModel = sequelize.define(
        'WorkerWeekendDaysModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            weekend0: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            weekend1: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            weekend2: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            weekend3: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            weekend4: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            weekend5: {
                type: DataTypes.BOOLEAN,
                default: false
            },
            weekend6: {
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