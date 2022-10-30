'use strict';
const events = require('./events');
require('./pilot');
require('./manager');

events.on('new-flight', flightSystem);
events.on('took-off', flightSystem);
events.on('arrived', flightSystem);

function flightSystem(payload) {
    let time = new Date();
    let Flight = {
        event: payload.event,
        time: time.toLocaleString(),
        Details: payload.Details
    }
  console.log({Flight}); 
}

