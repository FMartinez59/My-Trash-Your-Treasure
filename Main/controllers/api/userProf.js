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
    // Calls the update method on the Book model
    SaleItem.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        pages: req.body.pages,
        edition: req.body.edition,
        is_paperback: req.body.is_paperback,
      },
      {
        // Gets the books based on the isbn given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )//when they hit save send this back
      .then((updatedBook) => {
        //might not need to send json 
        //make sure to send updated table of edited field
        res.json(updatedBook);
      })
      .catch((err) => res.json(err));
  });
