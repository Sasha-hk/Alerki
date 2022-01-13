module.exports = (sequelize, DataTypes) => {
    const UserPictureModel = sequelize.define(
        'UserPictureModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            picture: {
                type: DataTypes.BLOB,
            },
            pictureSourceUrl: {
                type: DataTypes.STRING(255),
            },
        },
        {
            tableName: 'UserPictures',
        }
    )

    return UserPictureModel
}