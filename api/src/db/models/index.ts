import { Options, Sequelize } from 'sequelize';
import config from '../../config/database';

const env: string = process.env.NODE_ENV || 'dev';

const sequelize: Sequelize = new Sequelize(
  (config as any)[env].database,
  (config as any)[env].username,
  (config as any)[env].password,
  <Options> (config as any)[env],
);

export default { sequelize };
