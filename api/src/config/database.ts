interface IConfigMode {
  username: string | undefined,
  password: string | undefined,
  database: string | undefined,
  host: string | undefined,
  dialect: string | undefined,
}

interface IDBConfig {
  dev: IConfigMode | undefined,
  test: IConfigMode | undefined,
  prod: IConfigMode | undefined,
}

const DBConfig: IDBConfig = {
  dev: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_HOST,
    dialect: process.env.DB_DEV_DIALECT,
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DATABASE,
    host: process.env.DB_TEST_HOST,
    dialect: process.env.DB_TEST_DIALECT,
  },
  prod: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    host: process.env.DB_PROD_HOST,
    dialect: process.env.DB_PROD_DIALECT,
  },
};

export default DBConfig;
