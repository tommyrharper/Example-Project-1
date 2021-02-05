const express = require('express');

const fileController = require('../controllers/fileController');

const router = express.Router();

// ADD STORE FAVORITE ROUTE HANDLER HERE
router.post('/:id', fileController.getFavs, fileController.addFav, (req, res) => {
  return res.status(200).json(res.locals);
});

// ADD REMOVE FAVORITE ROUTE HANDLER HERE


module.exports = router;
