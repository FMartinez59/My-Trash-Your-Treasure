const router = require('express').Router();
const User = require('../../models/User');
const SaleItem = require('../../models/SaleItem');

router.get('/', async (req, res) => {
  try {
    const SaleItem = await SaleItem.findAll();
    res.status(200).json(SaleItem);
      console.log(SaleItem)
    } catch (err) {
       res.status(500).json(err);
    }
  }
)

router.get('/:id', (req, res) => {
  // Get all from items from profile
  User.findByPk(req.params.id, {
    include: [{ model: SaleItem }]
  }
      //grabs user with their sale items
).then((userData) => {
    res.json(userData);
  });
});
//different id
router.put('/:id', (req, res) => {
  // Calls the update method on the SaleItem model
  SaleItem.update(
    {
      // All the fields you can update and the data attached to the request body.
      picture: req.body.picture,
      item_name: req.body.item_name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      // status: req.body.status,
    },
    {
      // Gets the sale items based on the userId given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  ) //when they hit save send this back
    .then((updatedItem) => {
      //might not need to send json
      //make sure to send updated table of edited field
      res.json(updatedItem);
    })
    .catch((err) => res.json(err));
});
module.exports = router;
