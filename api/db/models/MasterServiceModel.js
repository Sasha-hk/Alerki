module.exports = (sequelize, DataTypes) => {
    const MasterServiceModel = sequelize.define(
        'MasterServiceModel',
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
            masterID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            serviceID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: 'MasterServices',
        }
    )

    MasterServiceModel.associate = (models) => {
        MasterServiceModel.belongsTo(
            models.MasterProfileModel, 
            {
                foreignKey: 'masterID',
                onDelete: 'CASCADE',
            }
        )

        MasterServiceModel.belongsTo(
            models.ServiceModel,
            {
                foreignKey: 'serviceID',
                onDelete: 'CASCADE',
            }
        )
    }

    return MasterServiceModel
}