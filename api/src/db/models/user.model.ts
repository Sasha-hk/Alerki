import { Sequelize, Model, DataTypes } from 'sequelize';

export interface UserInterface {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pictureID: number;
  password: string;
  profileType: 'client' | 'master';
  clientID: number;
  masterID: number;
  banned: boolean;
}

class UserModel extends Model implements UserInterface {
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
      },
      firstName: {
        type: DataTypes.STRING(30),
      },
      lastName: {
        type: DataTypes.STRING(30),
      },
      phoneNumber: {
        type: DataTypes.STRING(12),
      },
      password: {
        type: DataTypes.STRING(1024),
      },
      profileType: {
        type: DataTypes.ENUM('client', 'master'),
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
