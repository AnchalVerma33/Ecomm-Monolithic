const { DB } = require("../connect");
const { DataTypes } = require("sequelize");

class UserModel {
  constructor() {
    this.db = DB.connection;
    console.log("This is User")
    this.schema = this.db.define(
      "User",
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(355),
        },
        phoneNumber: {
          type: DataTypes.STRING(355),
          unique : true,
          allowNull : false
        },
        isValidated: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        gender: {
          type: DataTypes.STRING(255),
        },
        salt :{
          type : DataTypes.STRING(255),
        },
        address:{
          type : DataTypes.STRING(355),
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: this.db.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: this.db.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        hooks: {
          // Hook to update the updatedAt field before an update
          beforeUpdate: (user) => {
            user.updatedAt = new Date(); // Update the updatedAt field with the current timestamp
          },
        },
        indexes: [
            {
              unique: true, 
              fields: ["email"],
            },
          ],
      }
    );
  }
}


module.exports = UserModel;
