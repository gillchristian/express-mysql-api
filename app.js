// server.js

'use strict';
// Basic Setup =============================================================
// =========================================================================
var express 	= require('express');

var app			= express(),
	bodyParser 	= require('body-parser'),
	morgan		= require('morgan'),
    jwt         = require('jsonwebtoken');

var config 		= require('./app/config'); // leave comented when going live to hereoku
var secret      = config.secret;

// App configuration =======================================================
// =========================================================================

app.use( bodyParser.urlencoded({extend: true}) ); // support encoded bodies
app.use( bodyParser.json() ); // support json encode bodies

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
  next();
});

// log requests to the console ---------------------------------------------
app.use(morgan('dev'));

// port --------------------------------------------------------------------
//var port = process.env.PORT || 8080; // when conection in heroku
var port = config.port;

app.use( bodyParser.json() ); // support json encode bodies
app.use( bodyParser.urlencoded({extend: true}) ); // support encoded bodies

// Routes ==================================================================
// =========================================================================

// middleware that happens on every request ---- log requests
app.use(function(req, res, next){

	console.log('/* -------------------------------------------------- */');
	// continue what we are doing
	next();
});

// basic api route :) ------------------------------------------------------
app.get('/', function(req, res){
	res.send('Welcome to the express-mysql API :)');
});

// API ROUTES --------------------------------------------------------------
// --- Authenticate ---
let authenticateRoutes = require('./app/routes/authenticate')(app, express);
app.use('/api/authenticate', authenticateRoutes);

// --- token virification middalware used from here ---
// --- following requests are required to provide a token ---
let tokenVerify = require('./app/middleware/tokenVerify');

app.use( tokenVerify );

// --- Users ---
let usersRoutes = require('./app/routes/users')(app, express);
app.use('/api/users', usersRoutes);
// --- Productos ---
let productsRoutes = require('./app/routes/products')(app, express);
app.use('/api/products', productsRoutes);
// --- Locutores ---
let locutoresRoutes = require('./app/routes/locutores')(app, express);
app.use('/api/locutores', locutoresRoutes);
// --- Terminaciones ---
let terminacionesRoutes = require('./app/routes/terminaciones')(app, express);
app.use('/api/terminaciones', terminacionesRoutes);

// MAIN CATCHALL ROUTE -----------------------------------------------------
// SENDS USERS TO THE FRONT END 
// hast to ve registered after OTHER ROUTES
app.get('*', function(req, res){
	res.sendFIle(path.join(__dirname + 'public/index.html'));
});

// Start the server ========================================================
// =========================================================================

app.listen(port);
console.log('Magic happens on port ' + port);
console.log('Visit localhost:' + port + '/api/users ------> get all users');
console.log('Visit localhost:' + port + '/api/locutores --> get all locutores');
console.log('Visit localhost:' + port + '/api/products ---> get all products');