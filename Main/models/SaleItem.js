const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class SaleItem extends Model {}
SaleItem.init(
  {
    //id id for db
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //picture of item
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //item name
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //price
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //stock
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //sold not sold
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
  }
);
//update by id pass in status
module.exports = SaleItem;