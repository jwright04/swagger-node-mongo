let request       = require('supertest');
let expect        = require('chai').expect;
let server        = require('../../../app');
let express       = require('express');
let rNumber       = require('genrandom').rNumber;
let Users         = require('../../../api/models/usersModel');
let userControler = require('../../../api/controllers/users');
let mongoose      = require('mongoose');
let mockgoose = require('mockgoose');

let app                = express();
let currentId          = "";
let fakeSwaggerRequest = {
	swagger: {
		params: {
			id: {}
		}
	}
};


describe('controllers', () => {

	after(() => {
		process.exit();
	});

	//CRUD db integration tests
	describe('users CRUD integration tests', () => {

		describe('POST Single User /users', () => {

			it('should post a single user', (done) => {
				request(server)
					.post('/users')
					.expect('Content-Type', /json/)
					.field('firstName', "Jane")
					.field('lastName', "Doe")
					.field('email', "testinguser@testing.com")
					.expect(200)
					.end((err, res) => {
						if (err) {
							throw err;
						}
						done();
					});
			});
		});

		describe('GET All User /users', () => {
			it('should return a list of all users', (done) => {
				request(server)
					.get('/users')
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {

						currentId = res.body.users[0]._id;

						if (err) {
							throw err;
						}
						done();
					});
			});
		});

		describe('GET One User /users/{id}', () => {

			it('should return a single user', (done) => {

				request(server)
					.get(`/users/${currentId}`)
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {

						if (err) {
							throw err;
						}
						done();
					});
			});
		});

		describe('PUT One User /users/{id}', () => {

			it('should update a single user', (done) => {

				request(server)
					.put(`/users/${currentId}`)
					.expect('Content-Type', /json/)
					.send({
						firstName: 'Manny',
						lastName: 'Cats',
						email: "mytester@gmail123.com"
					})
					.expect(200)
					.end((err, res) => {

						if (err) {
							throw err;
						}
						done();
					});
			});
		});

		describe('DELETE One User /users/{id}', () => {

			it('should delete a single user', (done) => {

				request(server)
					.del(`/users/${currentId}`)
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {

						if (err) {
							throw err;
						}
						done();
					});
			});
		});
	});

	//error unit tests
	describe('users errors unit tests', ()=> {

		describe('POST error saving new user /users', () => {
			let origUsersSave;

			beforeEach(() => {
				origUsersSave        = Users.prototype.save;
				Users.prototype.save = (callback) => {
					callback(new Error('my error'));
				};
			});

			afterEach(() => {
				Users.prototype.save = origUsersSave;
			});

			it('should error while attempting to get all users', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(500);
						return fakeRes;
					},
					json: (errMsg) => {
						expect(errMsg.message).to.exist;
						expect(errMsg.error).to.exist;
						done();
					}
				};
				userControler.save({ body: {} }, fakeRes, ()=> {

				});
			});
		});

		describe('GET error getting all /users', () => {
			let origUsersFind;

			beforeEach(() => {
				origUsersFind = Users.find;
				Users.find    = (callback) => {
					callback(new Error('my error'));
				};
			});

			afterEach(() => {
				Users.find = origUsersFind;
			});

			it('should error while attempting to get all users', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(500);
						return {
							json: (errMsg) => {
								expect(errMsg.message).to.exist;
								done();
							}
						}
					}
				};
				userControler.getAll({ body: {} }, fakeRes, ()=> {

				});
			});
		});

		describe('GET error getting one /users/{id}', () => {
			let origUsersFindOne;

			beforeEach(() => {
				origUsersFindOne = Users.findOne;
				Users.findOne    = (id, callback) => {
					callback(new Error('my error'));
				};
			});

			afterEach(() => {
				Users.findOne = origUsersFindOne;
			});

			it('should error while attempting to get one users', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(500);
						return {
							json: (errMsg) => {
								expect(errMsg.message).to.exist;
								done();
							}
						}
					}
				};
				userControler.getOne(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

		describe('GET error getting one null /users/{id}', () => {
			let origUsersFindOne;

			beforeEach(() => {
				origUsersFindOne = Users.findOne;
				Users.findOne    = (id, callback) => {
					callback(null, null);
				};
			});

			afterEach(() => {
				Users.findOne = origUsersFindOne;
			});

			it('should error while attempting to get one null users', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(404);
						return {
							json: (errMsg) => {
								expect(errMsg.message).to.exist;
								done();
							}
						}
					}
				};
				userControler.getOne(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

		describe('PUT error updating a user /users/{id}', () => {
			let origUsersUpdate;

			beforeEach(() => {
				origUsersUpdate = Users.findOne;
				Users.findOne   = (id, callback) => {
					callback(new Error('my error'));
				};
			});

			afterEach(() => {
				Users.findOne = origUsersUpdate;
			});

			it('should error while attempting to update a user', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(500);
						return fakeRes;
					},
					json: (errMsg) => {
						expect(errMsg.message).to.exist;
						expect(errMsg.error).to.exist;
						done();
					}
				};
				userControler.update(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

		describe('PUT error updating a null user /users/{id}', () => {
			let origUsersUpdate;

			beforeEach(() => {
				origUsersUpdate = Users.findOne;
				Users.findOne   = (id, callback) => {
					callback(null, null);
				};
			});

			afterEach(() => {
				Users.findOne = origUsersUpdate;
			});

			it('should error while attempting to update a null user', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(404);
						return fakeRes;
					},
					json: (errMsg) => {
						expect(errMsg.message).to.exist;
						done();
					}
				};
				userControler.update(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

		describe('PUT error saving updated user /users/{id}', () => {
			let origUsersUpdate;

			beforeEach(() => {
				origUsersUpdate = Users.findOne;
				Users.findOne   = (id, callback) => {
					callback(null, {
						firstName: "Jane",
						lastName: "Smith",
						email: "j@smithtest.com",
						save: function(callback){
							callback(new Error('my error'));
						}
					});
				};
			});

			afterEach(() => {
				Users.findOne = origUsersUpdate;
			});

			it('should error while attempting to save an updated user', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(500);
						return fakeRes;
					},
					json: (errMsg) => {
						expect(errMsg.message).to.exist;
						done();
					}
				};
				userControler.update(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

		describe('PUT error saving updated null user /users/{id}', () => {
			let origUsersUpdate;
			let hasError = false;
			let hasUser = false;

			beforeEach(() => {
				origUsersUpdate = Users.findOne;
				Users.findOne   = (id, callback) => {
					callback(null, {
						firstName: "Jane",
						lastName: "Smith",
						email: "j@smithtest.com",
						save: function(callback){
							callback(hasError, hasUser);
						}
					});
				};
			});

			afterEach(() => {
				Users.findOne = origUsersUpdate;
			});

			it('should error while attempting to save an updated null user', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(404);
						return fakeRes;
					},
					json: (errMsg) => {
						expect(errMsg.message).to.exist;
						done();
					}
				};
				userControler.update(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

		describe('DELETE error deleting one /users/{id}', () => {
			let origUsersFindOne;

			beforeEach(() => {
				origUsersDeleteOne      = Users.findByIdAndRemove;
				Users.findByIdAndRemove = (id, callback) => {
					callback(new Error('my error'));
				};
			});

			afterEach(() => {
				Users.findByIdAndRemove = origUsersDeleteOne;
			});

			it('should error while attempting delete one users', (done) => {
				let fakeRes = {
					status: (statusCode) => {
						expect(statusCode).to.equal(500);
						return {
							json: (errMsg) => {
								expect(errMsg.message).to.exist;
								done();
							}
						}
					}
				};

				userControler.deleteUser(fakeSwaggerRequest, fakeRes, ()=> {

				});
			});
		});

	});
});
