const sequelize = require('../config/connection');
const { User, SaleItem, UserBio} = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');
const bioData = require('./userBio.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const saleItem of itemData) {
    await SaleItem.create({
      ...saleItem,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const bios = await UserBio.bulkCreate(bioData, {
    individualHooks: true,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();