const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if(err)
            throw err;
        if(!user)
            return res.json({success:false,message:"User not found. Look what you are typing... Fuck."});
        User.comparePassword(password,user.password,(err,isMatch) => {
            if(err)
                throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn: 1800 // 30 mins
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });

            }else {
                return res.json({success: false, 'message': 'Password is incorrect! What are you doing!?'});
            }
        })
    })

});

//Profile
router.get('/profile',passport.authenticate('jwt', {session:false}),(req,res,next) => {
    res.json({user: req.user});
});

module.exports = router;