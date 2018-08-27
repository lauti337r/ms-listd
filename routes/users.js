const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Registration
router.post('/register',(req,res,next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password:req.body.password
    });
    User.addUser(newUser, (err,user) => {
        if(err){
            res.json({success: false,message: "Failed to register user. You messed up."});
        }else res.json({success: true,message: "User registered. Awesome."});
    })
});

//Auth
router.post('/auth',(req,res,next) => {
    res.send('Authentication');
});

//Profile
router.get('/profile',(req,res,next) => {
    res.send('Profile');
});

module.exports = router;