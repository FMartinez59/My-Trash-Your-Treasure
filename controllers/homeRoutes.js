const router = require('express').Router();
const { User, SaleItem, UserBio } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage');
});
//redirects to / above
router.get('/homepage', async (req, res) => {
  //res.render('homepage');
  res.redirect('/')
});

router.get('/add-item/:id', async (req, res) => {
  console.log("add item id",req.params.id)
  const profileId = req.params.id;
  res.render('add-item', {profile:profileId})
})
//need to send id to the view
router.post('/save-new-item', async (req, res) => {
  console.log(req.body)
  console.log("post in id", req.params.id)
  const id = req.body.profileId;
  res.redirect(`/profile/${id}`)
  //send data to db
  // try {
  //   const newPost = await SaleItem.create({
  //     ...req.body,
  //     userId: req.session.user_id,
  //   });

  //   console.log('newPost', newPost);

  //   res.status(200).json(newPost);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
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
