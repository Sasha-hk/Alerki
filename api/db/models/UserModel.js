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
            pictureID: {
                type: DataTypes.INTEGER,
            },

            clientProfileID: {
                type: DataTypes.INTEGER,
            },
            workerProfileID: {
                type: DataTypes.INTEGER,
            },

            googleAccessToken: {
                type: DataTypes.STRING(1024),
            },
            googleRefreshToken: {
                type: DataTypes.STRING(1024),
            },
            googleIdToken: {
                type: DataTypes.STRING(2050),
            },

            banned: {
                type: DataTypes.BOOLEAN,
                default: false,
            },
        },
        {
            tableName: 'Users',
        }
    )
     
    UserModel.associate = (models) => {
        UserModel.belongsTo(models.UserPictureModel, {
            foreignKey: 'pictureID',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })

        UserModel.belongsTo(models.ClientProfileModel, {
            foreignKey: 'cliendProfileID',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })

        UserModel.belongsTo(models.WorkerProfileModel, {
            foreignKey: 'workerProfileID',
            onDelete: 'CASCADE',
            allowNull: true,
            defaultValue: null,
        })
    }

    return UserModel
}