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
	
	var table = 'terminaciones';


// User ===================================================================
// ========================================================================

// --- ROUTES ----------------------------------------
	router.route('/')

		// get all the users ----------------------------------------------
		.get(function(req, res){
            
            let queryString = 'SELECT * from ??';
			
			dbConnection.query( queryString, table,(err, rows, fields)=>{
				if (err) throw err;
				console.log(rows.length + ' -> terminaciones retrived');
				res.json(rows);
				
			});
		});
	
	//dbConnection.end();
	
	return router;
};