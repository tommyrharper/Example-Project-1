const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const router = express.Router();

// ADD GET MORE CHARACTERS ROUTE HANDLER HERE
router.get('/', starWarsController.getMoreChar, starWarsController.populateCharacterPhotos, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/details', starWarsController.validateRequestCharacter, starWarsController.getHomeworld, starWarsController.getFilms, (req, res) => {
  return res.status(200).json(res.locals);
});

// ADD GET CHARACTER DETAILS ROUTE HANDLER HERE

module.exports = router;
