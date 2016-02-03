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
	
	var table = 'locutores';


// User ===================================================================
// ========================================================================


	// --- ROUTES ---------------------------
	router.route('/categorias')
		// get all the categories ------------------------------------------
		.get(function(req, res){
            
            let queryString = 'SELECT ?? from ??';
            let field= 'categoria';

			dbConnection.query(queryString, [field, table], (err, rows, fields)=>{
                if (err) throw err;
                
                let categories = [];
				rows.map( value => { if (categories.indexOf(value.categoria) === -1 ) categories.push(value.categoria); } );
                
                categories.sort();
				res.json(categories);
			});
		});

// --- ROUTES ----------------------------------------
	router.route('/')

		// get all the users ----------------------------------------------
		.get(function(req, res){
            
            let queryString = 'SELECT * from ??';
			
			dbConnection.query( queryString, table,(err, rows, fields)=>{
				if (err) throw err;
				console.log(rows.length + ' -> locutores retrived');
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
					res.send('Locutor Created!!!');
					console.log('Locutor saved!');
				}
			});

		});

	// --- ROUTES ---------------------------
	router.route('/:_id')
		
		// get an user by its id ------------------------------------------
		.get(function(req, res){

			let queriedUser = {
				locutor_id: req.params._id
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
				locutor_id: req.params._id
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
					res.send('Locutor Update!!!');
					console.log('Locutor updated!');
				}
			});
		})

		// remove a user --------------------------------------------------
		.delete(function(req, res){

			let queriedUser = {
				locutor_id: req.params._id
			};

			let queryString = 'DELETE FROM ?? WHERE ?';

			dbConnection.query(queryString, [table, queriedUser],(err)=>{
				if (err){
					res.send(err);
					throw err;
				} 
				else {
					res.send('Locutor Deleted!!!');
					console.log('Locutor deleted!');
				}
			});
		});
    
	// --- ROUTES ---------------------------
	router.route('/day/:_day')
		// get an user by its id ------------------------------------------
		.get(function(req, res){
            
            let dayColumn = 'horario_' + req.params._day + '_from';
            
            let queryString = 'SELECT * from ?? WHERE ?? IS NOT NULL';

			dbConnection.query(queryString, [table, dayColumn], (err, rows, fields)=>{
				if (err) throw err;

				console.log(rows.length + ' -> locutores retrived');
				res.json(rows);
			});
		});
	
	return router;
};