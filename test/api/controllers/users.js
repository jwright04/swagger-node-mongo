let request       = require('supertest');
let expect        = require('chai').expect;
let server        = require('../../../app');
let express       = require('express');
let rNumber       = require('genrandom').rNumber;
let Users         = require('../../../api/models/usersModel');
let userControler = require('../../../api/controllers/users');

let app       = express();
let currentId = "";

describe('controllers', () => {

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
                        firstName : 'Manny',
                        lastName  : 'Cats',
                        email     : "mytester@gmail123.com"
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

    //unit tests
    describe('users errors unit tests', ()=> {

        describe('POST error single user /users', ()=> {
            let origSave;
            beforeEach(() => {
                origSave             = Users.prototype.save;
                Users.prototype.save = (callback) => {
                    callback(new Error('my error'));
                };
            });

            afterEach(() => {
                Users.prototype.save = origSave;
            });

            it('should error while attempting to post a single user', (done) => {
                userControler.save({ body : {} }, {
                    status : (statusCode) => {
                        expect(statusCode).to.equal(500);
                        return {
                            json : (errMsg) => {
                                expect(errMsg).deep.equal(errMsg, {
                                    message : 'Error saving user',
                                    error   : "my error"
                                });
                                done();
                            }
                        }
                    }
                }, ()=> {

                });
            });
        });

        describe('GET error getting all /users', () => {
            let origUsersFind;

            beforeEach(() => {
                origUsersFind           = Users.find;
                Users.find = (callback) => {
                    callback(new Error('my error'));
                };
            });

            afterEach(() => {
                Users.find = origUsersFind;
            });

            it('should error while attempting to get all users', (done) => {
                let fakeRes = {
                    status : (statusCode) => {
                        expect(statusCode).to.equal(500);
                        return {
                            json : (errMsg) => {
                                expect(errMsg.message).to.exist;
                                done();
                            }
                        }
                    }
                }
                userControler.getAll({ body : {} }, fakeRes, ()=> {

                });
            });
        });

        describe('GET error saving a user /users', () => {
            let origUsersSave;

            beforeEach(() => {
                origUsersSave           = Users.prototype.save;
                Users.prototype.save = (callback) => {
                    callback(new Error('my error'));
                };
            });

            afterEach(() => {
                Users.prototype.save = origUsersSave;
            });

            it('should error while attempting to get all users', (done) => {
                let fakeRes = {
                    status : (statusCode) => {
                        expect(statusCode).to.equal(500);
                        return fakeRes;
                    },
                    json : (errMsg) => {
                        expect(errMsg.message).to.exist;
                        expect(errMsg.error).to.exist;
                        done();
                    }
                }
                userControler.save({ body : {} }, fakeRes, ()=> {

                });
            });
        });

    });

    //mongoose connection
    /*let origConOn = mongoose.connection.on;

    mongoose.connection.on = function (eventName, cb) {
        if (eventName === 'error') {
            setTimeout(cb.bind(null, {}), 0);
        } else {
            origConOn.apply(this, arguments);
        }
    }*/
});
