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

        AppointmentModel.hasMany(models.UserModel, {
            foreignKey: 'clientAppointments',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })

        AppointmentModel.hasMany(models.UserModel, {
            foreignKey: 'workerAppointments',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })
    }

    return AppointmentModel
}