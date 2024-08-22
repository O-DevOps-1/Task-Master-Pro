const http = require('http');
const socketio = require('socket.io');
const app = require('./app');  // Main Express app
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

// creating HTTP server
const server = http.createServer(app);

// initializing socket.io
const io = socketio(server);

// handle WebSocket connections
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  
  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });});

// serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = server;
