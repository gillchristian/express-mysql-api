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
	
	var table = 'productos';


// User ===================================================================
// ========================================================================

// --- ROUTES ----------------------------------------
	router.route('/')

		// get all the users ----------------------------------------------
		.get(function(req, res){
            
            let queryString = 'SELECT * from ??';
			
			dbConnection.query( queryString, table,(err, rows, fields)=>{
				if (err) throw err;
				console.log(rows.length + ' -> products retrived');
				res.json(rows);
				
			});
		})

		// add a single user ----------------------------------------------
		.post(function(req, res){
			
			let columns = ['name', 'last_name', 'email'];
			
			let user = [ req.body.name, req.body.last_name, req.body.email];
            
            let queryString = 'INSERT into ?? (??) VALUES (?)';
			
			dbConnection.query(queryString, [table, columns, user],(err)=>{
				if (err){
					res.send(err);
				} 
				else {
					res.send('Prduct Created!!!');
					console.log('Prduct saved!');
				}
			});

		});

	// --- ROUTES ---------------------------
	router.route('/:_id')
		
		// get an user by its id ------------------------------------------
		.get(function(req, res){

			let queriedUser = {
				producto_id: req.params._id
			};
            
            let queryString = 'SELECT * from ?? WHERE ?';

			dbConnection.query(queryString, [table, queriedUser], (err, row, fields)=>{
				if (err) throw err;

				console.log(row);
				res.json(row);
			});
		})

		// update an user -------------------------------------------------
		.put(function(req, res){
			
			let queriedUser = {
				producto_id: req.params._id
			};

			let userData = [ ];
            if (req.body.name) userData.push({name: req.body.name});
            if (req.body.last_name) userData.push({last_name: req.body.last_name}); 
            if (req.body.email) userData.push({email: req.body.email});

			let fields = userData.map( (value)=> mysql.escape(value) );
			
			let queryString = 'UPDATE ?? SET '+ fields.join(",") +' WHERE ?';

			dbConnection.query(queryString, [table, queriedUser],(err)=>{
				if (err){
					res.send(err);
					throw err;
				} 
				else {
					res.send('Prduct Update!!!');
					console.log('Prduct updated!');
				}
			});
		})

		// remove a user --------------------------------------------------
		.delete(function(req, res){

			let queriedUser = {
				producto_id: req.params._id
			};

			let queryString = 'DELETE FROM ?? WHERE ?';

			dbConnection.query(queryString, [table, queriedUser],(err)=>{
				if (err){
					res.send(err);
					throw err;
				} 
				else {
					res.send('Prduct Deleted!!!');
					console.log('Prduct deleted!');
				}
			});
		});
	
	//dbConnection.end();
	
	return router;
};