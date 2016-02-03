'use strict';

let config = {
	db: {
		host: 'servidor',
		user: 'root',
		password: null,
		database: 'maxmedia'
	},
	port: process.env.PORT || 3000,
    secret: 'insert--some--secret--here'
}

module.exports = config;

/*
'use strict';

let config = {
	db: {
		host: 'localhost',
		user: 'root',
		password: null,
		database: 'node_api'
	},
	port: process.env.PORT || 8080
}

module.exports = config;
*/