module.exports = (sequelize, DataTypes) => {
    const WorkerServiceModel = sequelize.define(
        'WorkerServiceModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            currency: {
                type: DataTypes.ENUM,
                values: ['UAN', 'USD', 'PLN', 'EUR'],
            },
            price: {
                type: DataTypes.STRING(64),
            },
            location: {
                type: DataTypes.STRING(256),
            },
            duration: {
                type: DataTypes.INTEGER,
            },
            workerID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            serviceID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: 'WorkerServices',
        }
    )

    WorkerServiceModel.associate = (models) => {
        WorkerServiceModel.belongsTo(
            models.WorkerProfileModel, 
            {
                foreignKey: 'workerID',
                onDelete: 'CASCADE',
            }
        )

        WorkerServiceModel.belongsTo(
            models.ServiceModel,
            {
                foreignKey: 'serviceID',
                onDelete: 'CASCADE',
            }
        )
    }

    return WorkerServiceModel
}