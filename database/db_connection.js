const { Sequelize, Model } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE),
    },
  },
  { logging: console.log }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully.`.green);
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`.red);
  }
}

//module.exports = testConnection
module.exports = sequelize;
