//user + sale items
//need to build relationship between user and their sale items
//1 user has many sale items but sale items doesnt have many users
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserItem extends Model {}

UserItem.init(
  {
    // Manually define the primary key
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
    isbn: {
      type: DataTypes.STRING
    },
    pages: {
      type: DataTypes.INTEGER
    },
    edition: {
      type: DataTypes.INTEGER
    },
    is_paperback: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
  }
);

module.exports = UserItem;