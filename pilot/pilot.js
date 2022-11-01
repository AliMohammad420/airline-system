'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const io = require('socket.io-client');
let host = `http://localhost:${PORT}`;
let airLineConnection = io.connect(`${host}/airline`);

airLineConnection.on('new-flight', tookOff); 
function tookOff(payload) {
    setTimeout(() => {
        let Flight = {
            event: 'took_off',
            time: new Date().toLocaleString(),
            Details: {
                airLine: 'Royal Jordanian Airlines',
                flightID: payload.Details.flightID,
                pilot: payload.Details.pilot,
                destination: payload.Details.destination
            }
        }
        console.log(`Pilot: flight with ID ‘${payload.Details.flightID}’ took-off`);
        airLineConnection.emit('took-off', Flight) 
    }, 4000);
}

airLineConnection.on('took-off', flightArrived); 
function flightArrived(payload) {
    setTimeout(() => {
        let Flight = {
            event: 'arrived',
            time: new Date().toLocaleString(),
            Details: {
                airLine: 'Royal Jordanian Airlines',
                flightID: payload.Details.flightID,
                pilot: payload.Details.pilot,
                destination: payload.Details.destination
            }
        }
        console.log(`Pilot: flight with ID '${payload.Details.flightID}' has arrived`);
        airLineConnection.emit('arrived', Flight) 
    }, 3000)

}