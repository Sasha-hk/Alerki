module.exports = (sequelize, DataTypes) => {
    const WorkerProfileModel = sequelize.define(
        'WorkerProfileModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            shirtBiography: {
                type: DataTypes.STRING(200),
            },
            instagramProfile: {
                type: DataTypes.STRING(100),
            },
            available: {
                type: DataTypes.BOOLEAN,
                default: true,
            },
        },
        {
            tableName: 'WorkerProfiles'
        }
    )

    return WorkerProfileModel
}