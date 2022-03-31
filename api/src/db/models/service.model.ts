import { Sequelize, Model, DataTypes } from 'sequelize';
import IService from '../../interfaces/db/models/service.interface';

class ServiceModel extends Model implements IService {
  id!: string;
  name!: string;
  available!: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, {
      tableName: 'Services',
      sequelize,
    });
  }
}

export default ServiceModel;
