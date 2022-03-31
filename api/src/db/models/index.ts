import { Options, Sequelize } from 'sequelize';
import config from '../../config/database';
import UserModel from './user.model';
import WeekendDaysModel from './weekend-days.model';
import AuthModel from './auth.model';
import ServiceModel from './service.model';

const env: string = process.env.NODE_ENV || 'dev';

export const sequelize: Sequelize = new Sequelize(
  (config as any)[env].database,
  (config as any)[env].user,
  (config as any)[env].password,
  {
    ...<Options> (config as any)[env],
    logging: false,
  },
);

const models = [
  UserModel,
  WeekendDaysModel,
  AuthModel,
  ServiceModel,
];

models.forEach(model => model.initialize(sequelize));

// Associations
AuthModel.belongsTo(UserModel, {
  foreignKey: 'userID',
  onDelete: 'CASCADE',
});

export {
  UserModel,
  WeekendDaysModel,
  AuthModel,
  ServiceModel,
};

export default {
  sequelize,
  UserModel,
  WeekendDaysModel,
  AuthModel,
  ServiceModel,
};
