const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

/**
 * require routers
 */

/**
 * handle parsing request body
 */

/**
 * handle requests for static files
 */

app.use(express.static(path.join(__dirname, '../client')));

/**
 * define route handlers
 */

// route handler to respond with main app

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// catch-all route handler for any requests to an unknown route
// app.use((err, req, res, next) => {

// })
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

/**
 * configire express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
