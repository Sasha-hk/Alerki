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
            slug: {
                type: DataTypes.STRING(11),
            },
        },
        {
            tableName: 'UserPictures',
        }
    )

    return UserPictureModel
}