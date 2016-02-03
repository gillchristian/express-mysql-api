var config	= require('./../config');
var jwt     = require('jsonwebtoken');

var secret  = config.secret;

function tokenVerify(req, res, next) {
    // do logging
    console.log('--- Someone trying to loging! ---');

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secret, function(err, decoded) {      

            if (err) res.status(403).send({ success: false, message: 'Invalid token.' });
            else { 
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;

                next(); // make sure we go to the next routes and don't stop here
            }
        });

    }
    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    else res.status(403).send({ success: false, message: 'No token provided.' });
};
module.exports = tokenVerify;