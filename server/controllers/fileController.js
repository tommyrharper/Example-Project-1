const fs = require('fs');
const path = require('path');

const fileController = {};

fileController.getCharacters = (req, res, next) => {
  const { results } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/characters.json'), 'UTF-8'));
  console.log('GET CHARACTERS')
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

fileController.getFavs = (req, res, next) => {
  const favs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/favs.json')));

  if (!favs) {
    return next({
      log: 'fileController.getFavs: ERROR: /* the error from the file system */',
      message: { err: 'fileController.getFavs: ERROR: Check server logs for details' },
    });
  }

  res.locals.favs = favs;

  return next();
};

// ADD MIDDLEWARE TO ADD A FAVORITE CHARACTER HERE

fileController.addFav = (req, res, next) => {
  if (typeof res.locals.favs !== 'object' || Array.isArray(res.locals.favs)) {
    return next({
      log: 'fileController.addFavs: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.favs to be an object.',
      message: { err: 'fileController.addFavs: ERROR: Check server logs for details' },
    });
  }
  const id = req.params.id;

  if (res.locals.favs[id]) return next();

  res.locals.favs[id] = true;
  try {
    fs.writeFileSync(path.resolve(__dirname, '../data/favs.json'), JSON.stringify(res.locals.favs));
  } catch {
    return next({
      log: 'fileController.addFav: ERROR: /* the error from the file system / other calls */',
      message: { err: 'fileController.addFav: ERROR: Check server logs for details' },
    });
  }
  return next();
};


// ADD MIDDLEWARE TO REMOVE A CHARACTER FROM FAVORITES HERE

fileController.removeCharacter = (req, res, next) => {
  if (typeof res.locals.favs !== 'object' || Array.isArray(res.locals.favs)) {
    return next({
      log: 'fileController.removeFav: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.favs to be an object.',
      message: { err: 'fileController.removeFav: ERROR: Check server logs for details' },
    });
  }
  const id = req.params.id;

  if (res.locals.favs[id]) {
    delete res.locals.favs[id];
  } else return next();

  try {
    fs.writeFileSync(path.resolve(__dirname, '../data/favs.json'), JSON.stringify(res.locals.favs));
  } catch {
    return next({
      log: 'fileController.removeFav: ERROR: /* the error from the file system / other calls */',
      message: { err: 'fileController.removeFav: ERROR: Check server logs for details' },
    });
  }

  return next();
};

// Extention 1: ADD MIDDLEWARE TO GET CHARACTER NICKNAMES HERE


// Extention 1: ADD MIDDLEWARE TO SET A CHARACTER'S NICKNAME HERE


// Extention 1: ADD MIDDLEWARE TO REMOVE A CHARACTER'S NICKNAME HERE


module.exports = fileController;
