const http = require('http');
const socketio = require('socket.io');
const app = require('./app');  // Main Express app
const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.on('disconnect', () => {
    console.log('WebSocket disconnected'); });});

module.exports = server;
