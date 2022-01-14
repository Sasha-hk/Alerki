const slugLength = require('../../config/models').appointemnt.slug.length;


module.exports = (sequelize, DataTypes) => {
    const AppointmentModel = sequelize.define(
        'AppointmentModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            slug: {
                type: DataTypes.STRING(11),
            },
            appointmentTime: {
                type: DataTypes.DATE,
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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