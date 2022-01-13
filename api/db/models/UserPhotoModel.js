module.exports = (sequelize, DataTypes) => {
    const UserPhotoModel = sequelize.define(
        'UserPhotoModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            photo: {
                type: DataTypes.BLOB,
            },
            photoSourceUrl: {
                type: DataTypes.STRING(255),
            },
        },
        {
            tableName: 'UserPhotos',
        }
    )

    return UserPhotoModel
}