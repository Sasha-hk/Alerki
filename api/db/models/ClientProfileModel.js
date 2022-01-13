module.exports = (sequelize, DataTypes) => {
    const ClientProfileModel = sequelize.define(
        'ClientProfileModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            tableName: 'ClientProfiles'
        }
    )

    ClientProfileModel.associate = (models) => {
        ClientProfileModel.belongsToMany(
            models.AppointmentModel, 
            {
                foreignKey: 'clientID',
                through: 'Appointment_Client'
            }
        )
    }

    return ClientProfileModel
}