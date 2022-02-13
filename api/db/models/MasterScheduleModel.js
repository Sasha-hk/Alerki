module.exports = (sequelize, DataTypes) => {
    const MasterScheduleModel = sequelize.define(
        'MasterScheduleModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            workerID: {
                type: DataTypes.INTEGER,
            },
            workingStartTime: {
                type: DataTypes.INTEGER,
            },
            workingEndTime: {
                type: DataTypes.INTEGER,
            },
            weekendDay: {
                type: DataTypes.BOOLEAN,
                default: false,
            },
            date: {
                type: DataTypes.DATEONLY,
            },
        },
        {
            tableName: 'WorkersSchedule',
        }
    )

    MasterScheduleModel.associate = (models) => {
        MasterScheduleModel.belongsTo(
            models.MasterProfileModel,
            {
                foreignKey: 'workerID',
                onDelete: 'CASCADE',
                allowNull: false,
            }
        )
    }

    return MasterScheduleModel
}