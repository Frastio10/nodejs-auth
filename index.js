const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
app.use(express.static('public'));


//route middlewares
app.use('/api/user/', authRoute);
app.use('/api/posts/', postRoute);

app.listen(3000,()=>console.log("Server is up!"));

