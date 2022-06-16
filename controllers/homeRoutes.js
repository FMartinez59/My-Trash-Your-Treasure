const router = require('express').Router();
const { User, SaleItem, UserBio } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {
  res.render('homepage');
});
//redirects to / above
router.get('/homepage', async (req, res) => {
  //res.render('homepage');
  res.redirect('/');
});

router.get('/add-item/:id', async (req, res) => {
  console.log('add item id', req.params.id);
  const profileId = req.params.id;
  res.render('add-item', { profile: profileId });
});

//need to send id to the view
router.post('/save-new-item', async (req, res) => {
  console.log(req.body);
  console.log('post in id', req.body.user_id);
  const id = req.body.user_id;
  //send data to db
  try {
    const newItem = await SaleItem.create({
      ...req.body,
      userId: req.body.user_id,
    });

    console.log('newItem', newItem);

    // res.status(200).json(newItem);
    res.redirect(`/profile/${id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/edit-item/:id', async (req, res) => {
  //console.log('pineapple');
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: SaleItem,
        },
      ],
    });
    const userData = user.get({ plain: true });
    userData.SaleItems[0].profile = req.params.id;
    console.log('userData', userData.SaleItems[0]);
    res.render('edit-item', userData.SaleItems[0]);
    // res.json(user)
    // res.render('productpg')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/save-edit-item', async (req, res) => {
  console.log(req.body);
  try {
    SaleItem.update (
      {
      item_name: req.body.item_name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    },
    {
      // Gets the sale items based on the userId given in the request parameters
      where: {
        id: req.body.user_id,
      },
    }
    )
    res.redirect(`/profile/${req.body.user_id}`);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/profile/:id', async (req, res) => {
  console.log('/profile/1');
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: SaleItem,
        },
        {
          model: UserBio,
        },
      ],
    });
    const userData = user.get({ plain: true });
    res.render('seller', userData);
    // res.json(user)
    // res.render('productpg')
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
