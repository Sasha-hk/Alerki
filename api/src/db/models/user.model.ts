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
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      profileType: {
        type: DataTypes.ENUM('client', 'master'),
      },
      banned: {
        type: DataTypes.BOOLEAN,
      },
    }, {
      tableName: 'Users',
      sequelize,
    });
  }
}

export default UserModel;
