const fetch = require('node-fetch');

const { convertToPhotoUrl } = require('../utils/helpers');

const starWarsController = {};

// ADD MIDDLEWARE TO GET MORE CHARACTERS HERE
starWarsController.getMoreChar = (req, res, next) => {
  fetch('https://swapi.dev/api/people/?page=3').then((res) => {
    return res.json();
  }).then((json) => {
    res.locals.newCharacters = json.results;
    return next();
  }).catch((err) => {
    console.log('error',err);
    next({
      err:
        "starWarsController.getMoreCharacters: ERROR: Check server logs for details",
    });
  });
};

// ADD MIDDLEWARE TO ADD CHARACTER PHOTOS HERE

starWarsController.populateCharacterPhotos = (req, res, next) => {
  if (res.locals.newCharacters) {
    const chars = res.locals.newCharacters;
    res.locals.newCharacters = chars.map((char) => {
      char.photo = convertToPhotoUrl(char.name);
      return char;
    });
  } else {
    next({ err: 'starWarsController.starWarsController: ERROR: Check server logs for details' });
  }
  return next();
};

// ADD REQUEST CHARACTER VALIDATION MIDDLEWARE HERE
starWarsController.validateRequestCharacter = (req, res, next) => {
  if (req.body.character) {
    if (req.body.character.homeworld && req.body.character.films) {
      return next();
    }
  } 
  return next({
    log: 'starWarsController.validateRequestCharacter: ERROR: expected /* insert missing property here */ to exist',
    message: { err: 'server POST /details: ERROR: Invalid request body' },
  });
}


// ADD GET HOMEWORLD MIDDLEWARE HERE
starWarsController.getHomeworld = (req, res, next) => {
  fetch(req.body.character.homeworld).then(res => res.json())
    .then(json => {
      res.locals.homeworld = json;
      return next();
    }).catch(err => next({
      log: `starWarsController.getHomeworld: ERROR: /* the error from the star wars api */`,
      message: { err: 'starWarsController.getHomeworld: ERROR: Check server logs for details' },
    }));
};



// ADD GET FILMS MIDDLEWARE HERE
starWarsController.getFilms = (req, res, next) => {
  const promises = [];
  req.body.character.films.forEach((film) => {
    promises.push(new Promise((resolve, reject) => {
      fetch(film).then(res => res.json())
        .then(json => resolve(json))
        .catch((err) => reject(err));
    }));
  });
  Promise.all(promises)
    .then(result => {
      res.locals.films = result;
      return next();})
    .catch(err => next({
      log: `starWarsController.getFilms: ERROR: /* the error from the star wars api */`,
      message: { err: 'starWarsController.getFilms: ERROR: Check server logs for details' },
    }));
};


module.exports = starWarsController;


// const newCharacters = new Promise((resolve, reject) => {
//   fetch('https://swapi.dev/api/people/?page=3');
// });

// const getNewCharacters = () => {
//   return new Promise((resolve, reject) => {
//     fetch('https://swapi.dev/api/people/?page=3')
//       .then((res) => res.json())
//       .then((json) => resolve(json))
//       .catch((err) => reject(err));
//   });
// };

// const newCharacters = await getNewCharacters();

// try {
//   const newCharacters = getNewCharacters().catch(() => next({
//     err:
//       "starWarsController.getMoreCharacters: ERROR: Check server logs for details",
//   }));
// } catch (err) {
//   console.log('error',err);
//   next({
//     err:
//       "starWarsController.getMoreCharacters: ERROR: Check server logs for details",
//   });
// }

