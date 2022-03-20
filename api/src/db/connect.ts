import sequelize from './models/index';

const env: string = process.env.NODE_ENV || 'dev';
console.log(sequelize, ' <<<< ');

function connect(): void {
  console.log(123);
  if (env === 'dev') {
    sequelize.sync();
  } else if (env === 'test') {
    sequelize.sync({ force: true });
  } else if (env === 'prod') {
    sequelize.sync();
  }
}

export default connect;
