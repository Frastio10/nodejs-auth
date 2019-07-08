const router = require('express').Router();
const verify = require('./verifytoken');
const bodyParser = require('body-parser');

// app.use(express.static('./public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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