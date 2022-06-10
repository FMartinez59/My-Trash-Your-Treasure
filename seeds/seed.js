const sequelize = require('../config/connection');
const { User, SaleItem,} = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const saleItem of itemData) {
    await SaleItem.create({
      ...saleItem,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();