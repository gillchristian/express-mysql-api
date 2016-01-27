'use strict';
var	mysql	= require('mysql');
var config 		= require('./../config'); // leave comented when going live to hereoku


module.exports = function(app, express){
	
	// conect to the database --------------------------------------------------
	//var database = process.env.database;
	var dbConnection = mysql.createConnection(config.db);
	
	dbConnection.connect();

	// get an instance of the Express Router ------------------------------
	var router = express.Router();
	
	var table = 'users';


// User ===================================================================
// ========================================================================

// localhost:8080/users --- ROUTES ----------------------------------------
	router.route('/users')

		// get all the users ----------------------------------------------
		.get(function(req, res){
			
			dbConnection.query('SELECT * from `users`', (err, rows, fields)=>{
				if (err) throw err;
				console.log(rows.length + ' -> users retrived');
				res.json(rows);
				
			});
		})

		// add a single user ----------------------------------------------
		.post(function(req, res){
			
			let columns = ['name', 'last_name', 'email'];
			
			let user = [ req.body.name, req.body.last_name, req.body.email];
			
			dbConnection.query('INSERT into `users` (??) VALUES (?)', [columns, user],(err)=>{
				if (err){
					res.send(err);
				} 
				else {
					res.send('User Created!!!');
					console.log('User saved!');
				}
			});

		});

	// Localhost:8080/users/:user_id --- ROUTES ---------------------------
	router.route('/users/:_id')
		
		// get an user by its id ------------------------------------------
		.get(function(req, res){

			let queriedUser = {
				id: req.params._id
			};

			dbConnection.query('SELECT * from `users` WHERE ?', queriedUser, (err, row, fields)=>{
				if (err) throw err;

				console.log(row);
				res.json(row);
			});
		})

		// update an user -------------------------------------------------
		.put(function(req, res){
			
			let queriedUser = {
				id: req.params._id
			};

			let userData = [ 
				{name: req.body.name}, 
				{last_name: req.body.last_name}, 
				{email: req.body.email}
			];

			let fields = userData.map( (value)=> mysql.escape(value) );
			
			let query = 'UPDATE `users` SET '+ fields.join(",") +' WHERE ?';

			dbConnection.query(query, queriedUser,(err)=>{
				if (err){
					res.send(err);
					throw err;
				} 
				else {
					res.send('User Update!!!');
					console.log('User updated!');
				}
			});
		})

		// remove a user --------------------------------------------------
		.delete(function(req, res){

			let queriedUser = {
				id: req.params._id
			};

			let query = 'DELETE FROM `users` WHERE ?';

			dbConnection.query(query, queriedUser,(err)=>{
				if (err){
					res.send(err);
					throw err;
				} 
				else {
					res.send('User Deleted!!!');
					console.log('User deleted!');
				}
			});
		});
	
	//dbConnection.end();
	
	return router;
};