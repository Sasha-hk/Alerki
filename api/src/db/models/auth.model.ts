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
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deviceName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      googleAccessToken: {
        type: DataTypes.STRING(1024),
      },
      googleRefreshToken: {
        type: DataTypes.STRING(1024),
      },
    }, {
      tableName: 'AuthData',
      sequelize,
    });
  }
}

export default AuthModel;
