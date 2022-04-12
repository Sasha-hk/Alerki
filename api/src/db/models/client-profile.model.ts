import { Sequelize, Model, DataTypes } from 'sequelize';
import IClientProfile from '../../interfaces/db/models/client-profile.model';

class ClientProfile extends Model implements IClientProfile {
  id!: string;
  available!: boolean;
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
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    }, {
      tableName: 'ClientProfiles',
      sequelize,
    });
  }
}

export default ClientProfile;
