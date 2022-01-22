module.exports = (sequelize, DataTypes) => {
    const WorkerScheduleModel = sequelize.define(
        'WorkerScheduleModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            workerID: {
                type: DataTypes.INTEGER,
            },
            workingTimeFrom: {
                type: DataTypes.INTEGER,
            },
            workingTimeTo: {
                type: DataTypes.INTEGER,
            },
            weekendDay: {
                type: DataTypes.BOOLEAN,
                default: false,
            },
            date: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'WorkersSchedule',
        }
    )

    WorkerScheduleModel.associate = (models) => {
        WorkerScheduleModel.belongsTo(
            models.WorkerProfileModel,
            {
                foreignKey: 'workerID',
                onDelete: 'CASCADE',
                allowNull: false,
            }
        )
    }

    return WorkerScheduleModel
}