const { DataTypes } = require('sequelize');
const { DB } = require("../connect");

class ProductModel {
  constructor() {
    this.db = DB.connection;
    console.log("This is Product")
    this.schema = this.db.define('Product', {
      productID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING, 
      },
      productDescription: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0, 
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: this.db.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: this.db.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    },{
      hooks: {
        beforeUpdate: (instance) => {
          instance.updatedAt = new Date(); 
        },
      },
    });
  }
}

  module.exports = ProductModel;