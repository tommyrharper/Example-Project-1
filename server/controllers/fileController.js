const fs = require('fs');
const path = require('path');

const fileController = {};

fileController.getCharacters = (req, res, next) => {
  const { results } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/characters.json'), 'UTF-8'));

  if (!results) {
    return next({
      log: 'fileController.getCharacters: ERROR: Error getting characters data from characters.json file',
      message: { err: 'Error occurred in fileController.getCharacters. Check server logs for more details.' },
    });
  }

  res.locals.characters = results;
  return next();
};

// ADD MIDDLEWARE TO GET FAVORITE CHARACTERS HERE


// ADD MIDDLEWARE TO ADD A FAVORITE CHARACTER HERE


// ADD MIDDLEWARE TO REMOVE A CHARACTER FROM FAVORITES HERE


// Extention 1: ADD MIDDLEWARE TO GET CHARACTER NICKNAMES HERE


// Extention 1: ADD MIDDLEWARE TO SET A CHARACTER'S NICKNAME HERE


// Extention 1: ADD MIDDLEWARE TO REMOVE A CHARACTER'S NICKNAME HERE


module.exports = fileController;
