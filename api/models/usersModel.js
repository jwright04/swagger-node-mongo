let mongoose = require('mongoose');
let usersSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    createdAt:Date
});

//pre save the date for each entry
usersSchema.pre('save', (next) => {
    this.createdAt = new Date();
    next();
});

module.exports =  mongoose.model('Users', usersSchema);