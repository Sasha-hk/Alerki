import { Sequelize, Model, DataTypes } from 'sequelize';
import IUserPicture from '../../interfaces/db/models/user-picture.interface';

class UserPictureModel extends Model implements IUserPicture {
  id!: string;
  picture!: Buffer;
  createdAt!: string;
  updatedAt!: string;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      picture: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    }, {
      tableName: 'UsersPicture',
      sequelize,
    });
  }
}

export default UserPictureModel;
