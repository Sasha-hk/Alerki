module.exports = (sequelize, DataTypes) => {
    const WorkerProfileModel = sequelize.define(
        'WorkerProfileModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            shortBiography: {
                type: DataTypes.STRING(200),
            },
            instagramProfile: {
                type: DataTypes.STRING(100),
            },
            available: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            workingTimeFrom: {
                type: DataTypes.INTEGER,
            },
            workingTimeTo: {
                type: DataTypes.INTEGER,
            },
            weekendDaysID: {
                type: DataTypes.INTEGER,
            },
        },
        {
            tableName: 'WorkerProfiles'
        }
    )

    WorkerProfileModel.associate = (models) => {
        WorkerProfileModel.belongsTo(
            models.WorkerWeekendDaysModel,
            {
                foreignKey: 'weekendDaysID',
                onDelete: 'CASCADE',
                allowNull: true,
                defaultValue: null,
            }
        )
    }

    return WorkerProfileModel
}