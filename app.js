const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


//DB config
const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('DB ' + config.database + ' is ON -- YEAH! Go Mongoose!');
});


const app = express();
const port = 3000;



//  Middleware
app.use(cors());
app.use(bodyParser.json());


//Routes
const users = require('./routes/users');
app.use('/users',users);
app.get('/', (req,res) => {
    res.send("Invalid endpoint");
});



//Set static folder (public)
app.use(express.static(path.join(__dirname,'public')));



app.listen(port, () => {
    console.log("SERVER STARTED ON PORT "+port);
});

