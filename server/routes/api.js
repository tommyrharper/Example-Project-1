const express = require('express');

const fileController = require('../controllers/fileController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
router.get('/', fileController.getCharacters, (req, res) => {
  console.log('inside api / router.get');
  return res.status(200).json({ characters: res.locals.characters});
});

module.exports = router;
