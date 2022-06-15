const router = require('express').Router();
const {User, SaleItem, UserBio} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage')
})

router.get('/profile/:id', async (req, res) => {
  console.log('/profile/1')
  try {
    const user = await User.findByPk(req.params.id, {
      include : [
        {
          model:SaleItem
        },
        {
          model: UserBio
        }
      ]
    });
    const userData = user.get({ plain: true});
     res.render('seller', userData)
    // res.json(user)
    // res.render('productpg')
  } catch(err) {
    res.status(500).json(err)
  }
})
module.exports = router;