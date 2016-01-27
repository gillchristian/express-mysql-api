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