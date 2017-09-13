var express = require('express');
var router = express.Router();
const authController = require ('../controllers/authController');
var models = require('../models/index');
var User =models.user;
var auth =new authController();


router.get('/signup', function(req, res, next) {
  var auth = new authController();
  auth.signup(req,res)
});

router.post('/signup', function(req, res) {
    auth.signup(req,res);
    
});
    
router.get('/signin', function(req, res, next) {
    //auth.signin(req,res)
  });


  router.post('/signin', function(req, res, next) {
    auth.signin(req,res)
  });

module.exports = router;