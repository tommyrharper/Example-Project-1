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


// ADD REQUEST CHARACTER VALIDATION MIDDLEWARE HERE


// ADD GET HOMEWORLD MIDDLEWARE HERE


// ADD GET FILMS MIDDLEWARE HERE


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

