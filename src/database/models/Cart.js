const { DataTypes } = require('sequelize');
const { DB } = require('../connect');

class CartModel {
  constructor() {
    this.db = DB.connection;
    console.log('This is CartModel');
    this.schema = this.db.define(
      'Cart',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        userID: {
          type: DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        productID: {
          type: DataTypes.UUID,
          references: {
            model: 'Products',
            key: 'productID',
          },
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
        },
        quantity: {
          type: DataTypes.INTEGER,
          validate: {
            min: 1,
          },
          defaultValue: 1,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: this.db.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: this.db.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeUpdate: (instance) => {
            instance.updatedAt = new Date();
          },
        },
        indexes: [
          {
            unique: false,
            fields: ['userID'],
          },
        ],
      },
    );
  }
}

module.exports = CartModel;
