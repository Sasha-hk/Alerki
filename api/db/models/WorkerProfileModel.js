module.exports = (sequelize, DataTypes) => {
    const WorkerProfileModel = sequelize.define(
        'WorkerProfileModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            tableName: 'WorkerProfiles'
        }
    )

    WorkerProfileModel.associate = (models) => {
        WorkerProfileModel.belongsToMany(
            models.AppointmentModel, 
            {            
                foreignKey: 'workerID',
                through: 'Appointment_Worker'
            }
        )
    }

    return WorkerProfileModel
}