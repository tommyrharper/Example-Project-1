const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const router = express.Router();

// ADD GET MORE CHARACTERS ROUTE HANDLER HERE
router.get('/', starWarsController.getMoreChar, (req, res) => {
  return res.status(200).json(res.locals);
});

// ADD GET CHARACTER DETAILS ROUTE HANDLER HERE

module.exports = router;
