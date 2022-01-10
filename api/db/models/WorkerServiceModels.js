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
            time: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: 'WorkerServices',
        }
    )

    WorkerServiceModel.associate = (models) => {
        WorkerServiceModel.belongsTo(models.UserModel, {
            foreignKey: 'workerID',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })
    }

    return WorkerServiceModel
}