const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

//connect to db
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true },
	()=>console.log('connected to database')
);

//Middlewares
app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//route middlewares
app.use('/api/user/', authRoute);
app.use('/api/posts/', postRoute);

app.get('/',(req,res) =>{
	res.sendFile(__dirname+'/public/index.html');
});

app.get('/api/user/login',(req, res)=>{
	res.sendFile(__dirname+'/public/login.html');
});


app.get('/api/user/register',(req, res)=>{
	res.sendFile(__dirname+'/public/register.html');
});


app.listen(process.env.PORT || 3000,()=>console.log("Server is up!"));

