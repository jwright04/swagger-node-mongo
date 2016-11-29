let mongoose    = require('mongoose');
let usersSchema = mongoose.Schema({

	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	createdAt: { type: Date }
});

//pre save the date for each entry
usersSchema.pre('save', (next) => {
	this.createdAt = new Date();
	next();
});

module.exports = mongoose.model('Users', usersSchema);