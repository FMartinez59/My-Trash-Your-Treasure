const router = require('express').Router();
const UserItem = require('../../models/UserItem');
const SaleItem = require('../../models/SaleItem');

router.get('/:id', (req, res) => {
    // Get all from items from profile
    UserItem.findOne(
        {
            //grabs user with their sale items
            where: { 
              id: req.params.id 
            },
          }
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
        status: req.body.status,
      },
      {
        // Gets the books based on the isbn given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )//when they hit save send this back
      .then((updatedItem) => {
        //might not need to send json 
        //make sure to send updated table of edited field
        res.json(updatedItem);
      })
      .catch((err) => res.json(err));
  });
