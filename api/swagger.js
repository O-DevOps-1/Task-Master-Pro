const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API for managing tasks and projects',
      contact: {
        name: 'Developer',},
      
      servers: ['http://localhost:5000'],
    },},
  
  apis: ['./routes/*.js'],};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
