'use strict';
var	mysql	= require('mysql');
var config	= require('./../config');
var jwt     = require('jsonwebtoken');


module.exports = function(app, express){
	
	// conect to the database --------------------------------------------------
	//var database = process.env.database;
	var dbConnection = mysql.createConnection(config.db);
    var secret = config.secret;
	
	dbConnection.connect();

	// get an instance of the Express Router ------------------------------
	var router = express.Router();
	
	var table = 'usuarios';


// User ===================================================================
// ========================================================================

// --- ROUTES ----------------------------------------
	router.route('/')

		// get all the users ----------------------------------------------
		.post(function(req, res){
            
            let queryColumns = ['usuario_password', 'usuario_username', 'usuario_nombres'];
            let usernameColumn = 'usuario_username';
            let username = req.body.username || req.params.username || req.query.username;
            let password = req.body.password || req.params.password || req.query.password;
            
            // --- usuario_emails usuario_username ---
            
            let queryString = 'SELECT ?? from ?? WHERE ?? = ?';
			
			dbConnection.query( queryString, [queryColumns, table, usernameColumn, username],(err, row, fields)=>{
				// --- error ---
                if (err) throw err;
                
                let user = row[0];
                
                // --- user not found ---
                if( !row.length )
                    res.json({success: false, message: 'Usuario no encontrado.'});
                // --- user found ---
				else {
                    // --- password check ---
                    let passwordCheck = user.usuario_password === password;
                    
                    // --- wrong password ---
                    if ( !passwordCheck ) res.json({success: false, message: 'Contraseña inválida.'}); 
                    // --- passowrd is right ---
                    // --- create token ---
                    else {
                        let userData = {
                            name: user.usuario_nombres,
                            userName: user.usuario_username
                        };
                        let tokenConfig = {expiresIn: 1440 * 60 /* 24 hour*/};
                        let token = jwt.sign(userData, secret, tokenConfig);
                        
                        res.json({
                            success: true,
                            message: 'Usuario autenticado.',
                            token: token
                        });
                    }
                } 
			});
	
		});
	
	return router;
};