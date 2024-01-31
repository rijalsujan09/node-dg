const {logEvents} = require('./logEvents')
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {};

// initialize object
const myEmitter = new MyEmitter();

// add Listener for Log Event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(()=> {
    myEmitter.emit('log', 'Log Event emitted!');
}, 2000)