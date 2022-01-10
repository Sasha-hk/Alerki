const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Services", deps: []
 * createTable() => "UserPhotos", deps: []
 * createTable() => "Appointments", deps: [Services]
 * createTable() => "Users", deps: [Users]
 * createTable() => "AuthUsers", deps: [Users]
 * createTable() => "WorkerServices", deps: [Users]
 *
 */

const info = {
  revision: 1,
  name: "base",
  created: "2022-01-10T19:03:33.782Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Services",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(64), field: "name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "UserPhotos",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        photo: { type: Sequelize.BLOB, field: "photo" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Appointments",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        appointmentTime: { type: Sequelize.DATE, field: "appointmentTime" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        serviceID: {
          type: Sequelize.INTEGER,
          field: "serviceID",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Services", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        email: { type: Sequelize.STRING(255), field: "email", unique: true },
        password: { type: Sequelize.STRING(500), field: "password" },
        firstName: { type: Sequelize.STRING(64), field: "firstName" },
        lastName: { type: Sequelize.STRING(64), field: "lastName" },
        phoneNumber: { type: Sequelize.STRING(16), field: "phoneNumber" },
        profileType: {
          type: Sequelize.ENUM("client", "worker"),
          field: "profileType",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        authID: {
          type: Sequelize.INTEGER,
          field: "authID",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "AuthUsers",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        accessToken: { type: Sequelize.STRING(550), field: "accessToken" },
        refreshToken: { type: Sequelize.STRING(550), field: "refreshToken" },
        googleAccessToken: {
          type: Sequelize.STRING(550),
          field: "googleAccessToken",
        },
        googleRefreshToken: {
          type: Sequelize.STRING(550),
          field: "googleRefreshToken",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userID: {
          type: Sequelize.INTEGER,
          field: "userID",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "WorkerServices",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        currency: {
          type: Sequelize.ENUM("UAN", "USD", "PLN", "EUR"),
          field: "currency",
        },
        price: { type: Sequelize.STRING(64), field: "price" },
        location: { type: Sequelize.STRING(256), field: "location" },
        time: { type: Sequelize.INTEGER, field: "time" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        workerID: {
          type: Sequelize.INTEGER,
          field: "workerID",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Appointments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["AuthUsers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Services", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserPhotos", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["WorkerServices", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
