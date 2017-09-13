var express = require('express');
var router = express.Router();
const authController = require ('../controllers/authController');
var passport = require("passport");
var jwt = require('jsonwebtoken');
var models = require('../models/index');
var User =models.user;
require('../config/passport/passport')(passport);

router.get('/signup', function(req, res, next) {
  var auth = new authController();
  auth.signup(req,res)
});

router.post('/signup', function(req, res) {
    if (!req.body.email || !req.body.password || !req.body.name) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        User.create(req.body)
        .then(user => {
          user!==null?res.json(user):res.json({code:0,error:"User not created"});
        }).error(function(err){
             res.json(err);
        });
    }
});
    
router.get('/signin', function(req, res, next) {
    var auth = new authController();
    auth.signin(req,res)
  });

 router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/signin'
}));  
module.exports = router;