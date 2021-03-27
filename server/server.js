const path = require('path');
const express = require('express');
require('./ultimate-logger/ultimate-logger.js');

const app = express();
const PORT = 3000;

/**
 * require routers
 */

const apiRouter = require('./routes/api.js');
const favsRouter = require('./routes/favs.js');
const charRouter = require('./routes/characters.js');
/**
 * handle parsing request body
 */

app.use(express.json());

/**
 * handle requests for static files
 */

app.use(express.static(path.join(__dirname, '../client')));

/**
 * define route handlers
 */
app.use('/api/characters', charRouter);
app.use('/api/favs', favsRouter);

app.use('/api', apiRouter);

// route handler to respond with main app

app.get('/', (req, res, next) => {
  return res.sendFile(path.join(__dirname, '../client/index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  console.log('404')
  return res.sendStatus(404);
});

/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

 

app.use((err, req, res, next) => {
  console.log('inside global error handler');
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign(defaultError, err);

  console.log('Error: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
