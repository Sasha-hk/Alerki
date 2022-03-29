import { Sequelize, Model, DataTypes } from 'sequelize';
import IUser from '../../interfaces/db/models/user.interface';

class UserModel extends Model implements IUser {
  id!: number;
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  pictureID!: number;
  password!: string;
  profileType!: 'client' | 'master';
  clientID!: number;
  masterID!: number;
  banned!: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init({
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(30),
      },
      lastName: {
        type: DataTypes.STRING(30),
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(12),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(1024),
      },
      profileType: {
        type: DataTypes.ENUM('client', 'master'),
        allowNull: false,
        defaultValue: 'client',
      },
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'Users',
      sequelize,
    });
  }
}

export default UserModel;
