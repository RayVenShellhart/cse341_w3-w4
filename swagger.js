const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Games Api',
        description: 'Games Api'
    },
    host: 'localhost:3000',
    schemes: [ 'https' ]
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc);