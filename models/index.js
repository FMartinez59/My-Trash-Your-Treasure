const User = require('./User');
const SaleItem = require('./SaleItem');
const UserBio = require("./userBio")
//user + sale items
//need to build relationship between user and their sale items
//1 user has many sale items but sale items doesn't have many users

SaleItem.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(SaleItem, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserBio.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})
User.hasOne(UserBio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
//user needs to r
module.exports = {
  User,
  SaleItem,
  UserBio
};