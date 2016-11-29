let mongoose     = require('mongoose');
let environment  = require('../config/environment').environment();
let localDBUrl   = 'mongodb://localhost:27017/swagger';
let testingDBUrl = environment.TEST_DB_URL; //add your testing DB here
let MONGO_URL    = process.env.MONGO_URL || (process.env.NODE_ENV === "test" ? testingDBUrl : localDBUrl);

mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_URL);

mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose default connection open to ${MONGO_URL}`);
    }).on('error', (err) => {
        console.log('Mongoose default connection error: ' + err);
    }).on('disconnected', () => {
        console.log('Mongoose default connection disconnected');
    });

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});