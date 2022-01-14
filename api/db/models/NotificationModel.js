module.exports = (sequelize, DataTypes) => {
    const NotificationModel = sequelize.define(
        'NotificationModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(50),
            },
            body: {
                type: DataTypes.STRING(255),
            },
        },
        {
            tableName: 'Notofications',
        }
    )

    NotificationModel.associate = (models) => {
        NotificationModel.belongsTo(
            models.UserModel,
            {
                foreignKey: 'for',
                onDelete: 'CASCADE',
                allowNull: true,
                defaultValue: null,
            }
        )

        NotificationModel.belongsTo(
            models.AppointmentModel,
            {
                foreignKey: 'appointmentID',
                onDelete: 'CASCADE',
                allowNull: true,
                defaultValue: null,
            }
        )
    }

    return NotificationModel
}