import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AuthInterface {
  id: number;
  refreshToken: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  deviceName: string;
  userID: number;
}

class AuthModel extends Model implements AuthInterface {
  id!: number;
  refreshToken!: string;
  googleAccessToken!: string;
  googleRefreshToken!: string;
  deviceName!: string;
  userID!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      refreshToken: {
        type: DataTypes.STRING(1024),
      },
      googleAccessToken: {
        type: DataTypes.STRING(1024),
      },
      googleRefreshToken: {
        type: DataTypes.STRING(1024),
      },
      deviceName: {
        type: DataTypes.STRING(50),
      },
    }, {
      tableName: 'AuthData',
      sequelize,
    });
  }
}

export default AuthModel;
