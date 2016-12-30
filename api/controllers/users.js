'use strict';
let Users = require('../models/usersModel');

module.exports = {
	getAll,
	save,
	getOne,
	update,
	deleteUser
};

//GET /users operationId
function getAll (req, res, next) {
	Users.find((err, users) => {
		if (err) {
			return res.status(500).json({
				message: 'Error getting user(s).'
			});
		}

		return res.json({ users: users });
	});

}

//POST /users operationId
function save (req, res, next) {

	let user = new Users(req.body);

	user.save((err, _user) => {

		if (err) {
			return res.status(500).json({
				message: 'Error saving user',
				error: err
			});
		}

		return res.json({
			success: 1,
			description: "User added"
		});
	});
}

//GET /users/{id} operationId
function getOne (req, res, next) {

	let id = req.swagger.params.id.value; //req.swagger contains the path parameters
	Users.findOne({ _id: id }, (err, user) => {
		if (err) {
			return res.status(500).json({
				message: 'Error getting user'
			});
		}
		if (!user) {
			return res.status(404).json({
				message: 'No such user'
			});
		}
		res.json(user);
	});
}

//PUT /users/{id} operationId
function update (req, res, next) {

	let id   = req.swagger.params.id.value; //req.swagger contains the path parameters
	let user = req.body;

	Users.findOne({ _id: id }, (err, _user) => {
		if (err) {
			return res.status(500).json({
				message: 'Error getting user',
				error: err
			});
		}
		if (!_user) {
			return res.status(404).json({
				message: 'No such user'
			});
		}

		_user.firstName = (req.body && req.body.firstName) ? req.body.firstName : _user.firstName;
		_user.lastName  = (req.body && req.body.lastName) ? req.body.lastName : _user.lastName;
		_user.email     = (req.body && req.body.email) ? req.body.email : _user.email;

		_user.save((err, user) => {
			if (err) {
				return res.status(500).json({
					message: 'Error getting user.'
				});
			}
			console.log("USER USER", user);
			if (!user) {
				return res.status(404).json({
					message: 'No such user'
				});
			}
			return res.json({
				success: 1,
				description: "User updated!"
			});
		});
	});
}

// DELETE /users/{id} operationId
function deleteUser (req, res, next) {

	let id = req.swagger.params.id.value;
	Users.findByIdAndRemove(id, (err, user) => {
		if (err) {
			return res.status(500).json({ message: 'Error getting user' })
		}
		return res.json({
			success: 1,
			description: "User deleted!"
		});
	});
}