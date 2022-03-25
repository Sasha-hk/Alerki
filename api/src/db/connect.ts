import { Sequelize } from 'sequelize';
import { sequelize } from './models/index';

interface IDatabase {
  readonly sequelize: Sequelize;
  readonly env: string;
}

/**
 * Database object
 */
class Database implements IDatabase {
  readonly sequelize;
  readonly env = process.env.NODE_ENV || 'dev';

  /**
   * Database constructor
   */
  constructor() {
    this.sequelize = sequelize;
  }

  /**
   * Connect to database
   */
  public connect() {
    if (this.env === 'dev') {
      sequelize.sync({
        logging: false,
      });
      console.log('Connected to development database');
    } else if (this.env === 'test') {
      sequelize.sync({
        force: true,
        logging: false,
      });
      console.log('Connected to testing database');
    } else if (this.env === 'prod') {
      sequelize.sync({ logging: false });
      console.log('Connected to production database');
    }
  }
}

export default Database;
