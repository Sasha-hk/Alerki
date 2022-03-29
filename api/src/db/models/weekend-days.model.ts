import { Sequelize, Model, DataTypes } from 'sequelize';

export interface WeekendDaysInterface {
  id: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;

}

class WeekendDaysModel extends Model implements WeekendDaysInterface {
  id!: string;
  monday!: boolean;
  tuesday!: boolean;
  wednesday!: boolean;
  thursday!: boolean;
  friday!: boolean;
  saturday!: boolean;
  sunday!: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      monday: {
        type: DataTypes.BOOLEAN,
      },
      tuesday: {
        type: DataTypes.BOOLEAN,
      },
      wednesday: {
        type: DataTypes.BOOLEAN,
      },
      thursday: {
        type: DataTypes.BOOLEAN,
      },
      friday: {
        type: DataTypes.BOOLEAN,
      },
      saturday: {
        type: DataTypes.BOOLEAN,
      },
      sunday: {
        type: DataTypes.BOOLEAN,
      },
    }, {
      tableName: 'WeekendDays',
      sequelize,
    });
  }
}

export default WeekendDaysModel;
