let mongoose = require('mongoose');
let devDBUrl = 'mongodb://localhost/swagger';
let MONGO_URL = process.env.MONGO_URL || devDBUrl;

mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${MONGO_URL}`);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});