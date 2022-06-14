const User = require('./User');
const SaleItem = require('./SaleItem');
const UserBio = require("./userBio")
//user + sale items
//need to build relationship between user and their sale items
//1 user has many sale items but sale items doesn't have many users

SaleItem.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(SaleItem, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

UserBio.belongsTo(user, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
//user needs to r
module.exports = {
  User,
  SaleItem
};