import { Options, Sequelize } from 'sequelize';
import config from '../../config/database';

const env: string = process.env.NODE_ENV || 'dev';

export const sequelize: Sequelize = new Sequelize(
  (config as any)[env].database,
  (config as any)[env].username,
  (config as any)[env].password,
  <Options> (config as any)[env],
);

// Const a = {
//   sequelize,
//   Sequelize,
//   Comment: CommentFactory(sequelize, Sequelize),
//   Post: PostFactory(sequelize, Sequelize),
//   User: UserFactory(sequelize, Sequelize),
// };

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default {};
