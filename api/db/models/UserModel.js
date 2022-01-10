module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define(
        'UserModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(255),
                unique: true,
            },
            password: {
                type: DataTypes.STRING(500),
            },
            firstName: {
                type: DataTypes.STRING(64),
            },
            lastName: {
                type: DataTypes.STRING(64),
            },
            phoneNumber: {
                type: DataTypes.STRING(16),
            },
            profileType: {
                type: DataTypes.ENUM,
                values: ['client', 'worker'],
            },
        },
        {
            tableName: 'Users',
        }
    )
    
    UserModel.associate = (models) => {
        UserModel.belongsTo(models.UserPhotoModel, {
            foreignKey: 'photoID',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })

        UserModel.hasMany(models.UserModel, {
            foreignKey: 'authID',
            onDelete: 'CASCADE',
            allowNull: false,
            defaultValue: null,
        })

        UserModel.hasMany(models.UserPhotoModel, {
            foreignKey: 'photoID',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })
    }

    return UserModel
}