const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db_connection");
const config = require("config");
const jwt = require("jsonwebtoken");

class User extends Model {
  generationKey() {
    return jwt.sign({ _id: this.id }, process.env.DB_PRIVATEKEY);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING(1024),
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
