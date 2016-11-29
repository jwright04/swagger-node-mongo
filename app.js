'use strict';

let express        = require('express');
let SwaggerExpress = require('swagger-express-mw');
let app            = require('express')();
let dbConnect      = require('./config/dbConnect');

module.exports = app; // for testing

let config = {
	appRoot: __dirname // required config
};

app.use(express.static('public'));

SwaggerExpress.create(config, (err, swaggerExpress) => {
	if (err) {
		throw err;
	}

	// install middleware
	swaggerExpress.register(app);

	let port = process.env.PORT || 10010;
	app.listen(port);
	console.log("Swagger Application listening on port:", port);
	//swaggerExpress.runner.swagger.paths['/hello']
});

