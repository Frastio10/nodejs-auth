const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/', verify ,(req, res) => {
	res.json({
		post : {
			title: 'my first post', 
			description:'random data'
		} 
	});

	res.send(req.user);
	user.findByOne({_id: req.user})
})


module.exports = router;