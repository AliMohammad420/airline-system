'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const ioServer = require('socket.io')(PORT);
const airLineSystem = ioServer.of('/airline');

ioServer.on('connection', (socket) => {
    console.log('connected to ioServer ', socket.id);
    socket.on('new-flight', (payload) => { 
        let Flight = {
            event: payload.event,
            time: new Date().toLocaleString(),
            Details: {
                airLine: 'Royal Jordanian Airlines',
                flightID: payload.Details.flightID,
                pilot: payload.Details.pilot,
                destination: payload.Details.destination
            }
        }
        airLineSystem.emit('new-flight', payload) 
        console.log({ Flight });
    });
});

airLineSystem.on('connection', (socket) => {
    console.log('connected to airline system ', socket.id);

    socket.on('took-off', (payload) => { 
        let Flight = {
            event: payload.event,
            time: new Date().toLocaleString(),
            Details: {
                airLine: 'Royal Jordanian Airlines',
                flightID: payload.Details.flightID,
                pilot: payload.Details.pilot,
                destination: payload.Details.destination
            }
        }
        airLineSystem.emit('took-off', payload) 
        console.log({ Flight });
    });
    socket.on('arrived', (payload) => { 
        let Flight = {
            event: payload.event,
            time: new Date().toLocaleString(),
            Details: {
                airLine: 'Royal Jordanian Airlines',
                flightID: payload.Details.flightID,
                pilot: payload.Details.pilot,
                destination: payload.Details.destination
            }
        }
        airLineSystem.emit('arrived', payload) 
        console.log({ Flight });
        console.log('====================================');
    });
});