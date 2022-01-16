module.exports = (sequelize, DataTypes) => {
    const WorkerProfileModel = sequelize.define(
        'WorkerProfileModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            tableName: 'WorkerProfiles'
        }
    )

    return WorkerProfileModel
}