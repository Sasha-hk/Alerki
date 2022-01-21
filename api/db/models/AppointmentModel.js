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
                allowNull: false,
            },
            appointmentStartTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            appointmentEndTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // in milliseconds
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            workerServiceID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            clientID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            workerID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'Appointments',
        }
    )

    AppointmentModel.associate = (models) => {
        AppointmentModel.belongsTo(
            models.ClientProfileModel, 
            {
                foreignKey: 'clientID',
                onDelete: 'CASCADE',
            }
        )

        AppointmentModel.belongsTo(
            models.WorkerServiceModel, 
            {
                foreignKey: 'serviceID',
                onDelete: 'CASCADE',
            }
        )

        AppointmentModel.belongsTo(
            models.WorkerProfileModel, 
            {
                foreignKey: 'workerID',
                onDelete: 'CASCADE'
            }
        )
    }

    return AppointmentModel
}