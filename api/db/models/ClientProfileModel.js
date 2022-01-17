module.exports = (sequelize, DataTypes) => {
    const ClientProfileModel = sequelize.define(
        'ClientProfileModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            available: {
                type: DataTypes.BOOLEAN,
                default: true,
            },
        },
        {
            tableName: 'ClientProfiles'
        }
    )

    return ClientProfileModel
}