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
            },
            clientConfirm: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            workerConfirm: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            clientID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            workerID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            workerServiceID: {
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
            models.WorkerProfileModel, 
            {
                foreignKey: 'workerID',
                onDelete: 'CASCADE'
            }
        )

        AppointmentModel.belongsTo(
            models.WorkerServiceModel, 
            {
                foreignKey: 'workerServiceID',
                onDelete: 'CASCADE',
            }
        )
    }

    return AppointmentModel
}