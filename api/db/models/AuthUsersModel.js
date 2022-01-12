module.exports = (sequelize, DataTypes) => {
    const AuthUserModel = sequelize.define(
        'AuthUserModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            deviceName: {
                type: DataTypes.STRING(255),
            },
            accessToken: {
                type: DataTypes.STRING(1024)
            },
            refreshToken: {
                type: DataTypes.STRING(1024),
            },
            googleAccessToken: {
                type: DataTypes.STRING(1024),
            },
            googleRefreshToken: {
                type: DataTypes.STRING(1024),
            },
        },
        {
            tableName: 'AuthUsers',
        }
    )

    AuthUserModel.associate = (models) => {
        AuthUserModel.belongsTo(models.UserModel, {
            foreignKey: 'userID',
            onDelete: 'CASCADE',
            allowNull: false,
            defaultValue: null,
        })
    }

    return AuthUserModel
}