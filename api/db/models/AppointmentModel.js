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
            masterConfirm: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            clientID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            masterID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            masterServiceID: {
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
            models.MasterProfileModel, 
            {
                foreignKey: 'masterID',
                onDelete: 'CASCADE'
            }
        )

        AppointmentModel.belongsTo(
            models.MasterServiceModel, 
            {
                foreignKey: 'masterServiceID',
                onDelete: 'CASCADE',
            }
        )
    }

    return AppointmentModel
}