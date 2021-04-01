const fetch = require('node-fetch');
const Queue = require('./queue.js');
const client = require('socket.io-client');

const socket = client.connect('http://localhost:3861/');

const queue = new Queue();

module.exports = (req, res, next) => {
  queue.enqueue(() => {
    return new Promise((resolve) => {
      const oldWrite = res.write;
      const oldEnd = res.end;
      const chunks = [];
      const PORT = 3861;

      res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
      };

      res.end = (...restArgs) => {
        if (restArgs[0]) {
          chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');

        // Add the log to our history.
        const data = [
          {
            class: 'request',
            timestamp: new Date()
              .toISOString()
              .split('T')
              .join(' - ')
              .slice(0, -1),
            fromIP:
              req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            method: req.method,
            originalUri: req.originalUrl,
            uri: req.url,
            requestData: req.body,
          },
          {
            class: 'response',
            timestamp: new Date()
              .toISOString()
              .split('T')
              .join(' - ')
              .slice(0, -1),
            responseData: body,
            responseStatus: res.statusCode,
            referer: req.headers.referer || '',
          },
        ];
        socket.emit('store-logs', data);
        socket.on('store-logs', () => resolve('Success'));

        oldEnd.apply(res, restArgs);
      };
      next();
    });
  });
};
