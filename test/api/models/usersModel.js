let chai     = require('chai');
let expect   = chai.expect;
let express  = require('express');
let Users    = require('../../../api/models/usersModel');
let app      = express();
let mongoose = require('mongoose');
let rNumber = require('genrandom').rNumber;

describe("models", () => {
	describe("users", () => {
		describe("compare user model", () => {
			it("should contain minimum number of fields from users model", (done) => {
				let minUserModelFields = [
					'_id',
					'id',
					'__v',
					'firstName',
					'lastName',
					'email',
					'createdAt'
				];
				let actualUserModelFields = [];
				for (key in Users().schema.tree){
					actualUserModelFields.push(key);
				}
				expect(actualUserModelFields).to.have.length.of.at.least(minUserModelFields.length);
				done();
			});
		});
	});
});