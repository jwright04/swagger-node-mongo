let should  = require('should');
let request = require('supertest');
let server  = require('../../../app');
let express = require('express');
let rNumber = require('genrandom').rNumber;

let app = express();

app.get('/users', function (req, res) {
    res.status(200).json({
        id        : String(rNumber(15)),
        firstName : 'tobi',
        lastName  : 'smith',
        email     : 'testing@test.com'
    });
});

/*app.post('/users', function (req, res) {
    let userObj = {
        id : rNumber(15),
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    }
    res.send(userObj);
});*/

describe('controllers', () => {

    describe('users', () => {

        describe('GET Single User /users', () => {
            it('should return a single user', (done) => {
                request(server)
                    .get('/users')
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

        describe('POST Single User /users', () => {
            it('should post a single user', (done) => {
                request(server)
                    .post('/users')
                    .expect('Content-Type', /json/)
                    .field('id', rNumber(15))
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
    });
});
