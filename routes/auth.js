const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');


router.post('/register', async (req,res)=>{
	//validate data

	const {error} = registerValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	//check user email existency
	const emailExist = await User.findOne({email : req.body.email});
	if(emailExist) return res.status(400).send('Email already exist');

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	//Create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword
	});

	try {
		const savedUser = await user.save();
		res.send({user: user._id});

	} catch(err){
		res.status(400).send(err);
	}

});


router.post('/login', async (req,res)=>{
	//validate data
	const {error} = loginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	//check user email existency
	const user = await User.findOne({email : req.body.email});
	if(!user) return res.status(400).send('Email not found');
	//if password correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('Invalid Password');

	//create and assign token
	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	res.header('auth-token', token);

    res.sendFile('/public/home.html', { 'root':'../node-auth' });

})	


module.exports = router;