module.exports = (sequelize, DataTypes) => {
    const AppointmentModel = sequelize.define(
        'AppointmentModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            appointmentTime: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'Appointments',
        }
    )

    AppointmentModel.associate = (models) => {
        AppointmentModel.belongsTo(models.ServiceModel, {
            foreignKey: 'serviceID',
            onDelete: 'CASCADE',
            allowNull:true,
            defaultValue:null,
        })

        AppointmentModel.belongsToMany(
            models.ClientProfileModel, 
            {
                foreignKey: 'appointmentID',
                through: 'Appointment_Client',
            }
        )

        AppointmentModel.belongsToMany(
            models.WorkerProfileModel, 
            {
                foreignKey: 'appointmentID',
                through: 'Appointment_Worker',
            }
        )
    }

    return AppointmentModel
}