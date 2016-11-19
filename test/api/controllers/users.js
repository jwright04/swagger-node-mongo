let should = require('should');
let request = require('supertest');
let server = require('../../../app');
let express = require('express');
let rNumber = require('genrandom').rNumber;

let app = express();

app.get('/users', function(req, res) {
    res.status(200).json({
        id: String(rNumber(15)),
        firstName: 'tobi',
        lastName: 'smith',
        email: 'testing@test.com'
    });
});

describe('controllers', () => {

    describe('users', () => {

        describe('GET Single User /users', () => {
            it('should return a single user', (done) => {
                request(server)
                    .get('/users')
                    .expect('Content-Type', /json/)
                    .expect('Content-Length', '12')
                    .expect(200)
                    .end((err, res) => {
                        if (err) throw err;
                        done();
                    });
            });
        });
    });
});
