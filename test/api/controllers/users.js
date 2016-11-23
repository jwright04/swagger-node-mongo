let request = require('supertest');
let server  = require('../../../app');
let express = require('express');
let rNumber = require('genrandom').rNumber;
let Users = require('../../../api/models/usersModel');


let app = express();
let currentId = "";

describe('controllers', () => {

    describe('users', () => {

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
                    .send({ firstName: 'Manny', lastName: 'Cats', email:"mytester@gmail123.com" })
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
});
