const fetch = require('node-fetch');

module.exports = (req, res, next) => {
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

    fetch(`http://localhost:${PORT}/api/requests`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toUTCString(),
        fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        originalUri: req.originalUrl,
        uri: req.url,
        requestData: req.body,
        responseData: body,
        responseStatus: res.statusCode,
        referer: req.headers.referer || '',
      }),
    })
      .then()
      .catch(() =>
        console._error('Connection refused to the Ultimate Logger Server')
      );

    oldEnd.apply(res, restArgs);
  };
  next();
};
