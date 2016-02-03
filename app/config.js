'use strict';

let config = {
	db: {
		host: 'servidor',
		user: 'root',
		password: null,
		database: 'maxmedia'
	},
	port: process.env.PORT || 3000,
    secret: 'NqtIfs/S52F6]||NM&s^dj6IP3$o`brn&Au15%d]vk(W2{<PSFo#bqYaZ`P]43fw'
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