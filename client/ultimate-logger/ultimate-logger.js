import './console-history.min.js';

const PORT = 3861;

import { io } from "socket.io-client";
const socket = io('http://localhost:3861/', {transports: ['websocket']});

console._collect = function (type, args) {
  // Collect the timestamp of the console log.
  var time = new Date().toISOString().split('T').join(' - ').slice(0, -1);

  // Make sure the 'type' parameter is set. If no type is set, we fall
  // back to the default log type.
  if (!type) type = 'log';

  // To ensure we behave like the original console log functions, we do not
  // output anything if no arguments are provided.
  if (!args || args.length === 0) return;

  // Act normal, and just pass all original arguments to
  // the origial console function :)
  console['_' + type].apply(console, args);

  // Get stack trace information. By throwing an error, we get access to
  // a stack trace. We then go up in the trace tree and filter out
  // irrelevant information.
  var stack = false;
  try {
    throw Error('');
  } catch (error) {
    // The lines containing 'console-history.js' are not relevant to us.
    var stackParts = error.stack.split('\n');
    stack = [];
    for (var i = 0; i < stackParts.length; i++) {
      if (
        stackParts[i].indexOf('console-history.js') > -1 ||
        stackParts[i].indexOf('console-history.min.js') > -1 ||
        stackParts[i] === 'Error'
      ) {
        continue;
      }
      stack.push(stackParts[i].trim());
    }
  }
  // Add the log to our history.
  if (type !== 'warn') {
    const data = {
      type: type,
      timestamp: time,
      arguments: args,
      stack: stack,
    };
    socket.emit("store-logs", { class: 'client', logs: data });
  }
};
