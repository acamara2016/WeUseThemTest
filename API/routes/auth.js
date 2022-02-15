var express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.post('/register', function(req, res, next) {
    const {firstName, lastName, email, phone_number, password} = req.body;
    User.findOne({email: email})
    .then(user=>{
        if(user){
            return res.send({message:'Email exist already'});
        }
        return bcrypt.hash(password, 11)
        .then(hashPass =>{
            const newUser = new User({
				firstName: firstName, 
				lastName: lastName,
				email: email,
				phone_number: phone_number,
				password: hashPass,
				contacts:[]
                
            });
            return newUser.save();
        })
        .then(response=>{
            res.send(response);
        })
        .catch(error=>{
            console.log(error);
        });
    })
    .catch(err=>{
        console.log(err);
    })
});
router.post('/login', function(req, res, next){
	console.log(req.body);
    const {email, password} = req.body;
    if ((email == undefined || email == '') && (password == undefined || password == '')) {
		res.status(401).json({
			'msg': 'Authentication failed'
		}).end()
	} else {
		User.findOne({ email: email })
		.exec()
		.then(data => {
			if ( data === null ) {
				res.status(401).json({
					'msg': 'Authentication failed',
				}).end()
			}
			// Compare the password
			bcrypt.compare(password, data.password)
			.then(doMatch=>{
				if(doMatch){
					const payLoad = {
						'email': data.email,
						'firstName': data.firstName,
						'lastName': data.lastName
					}
					// Options for the token
					const jwtOptions = {
						expiresIn: "2h"
					}

					// Generate the token
					const token = jwt.sign(payLoad, 'CONTACT_API', jwtOptions)

					// Send the token
					res.status(200).json({
						'msg': 'Authentication successful',
						'auth_token': token,
						'userId': data._id,
						'email': data.email,
						'firstName': data.firstName,
						'lastName': data.lastName,
						'phone_number': data.phone_number
					})
				} else {
					res.status(401).json({
						'msg': 'Authentication failed'
					}).end()
				}
			})
		})
		.catch(e => {
			console.log(e)
		})
	}
}) 

module.exports = router;