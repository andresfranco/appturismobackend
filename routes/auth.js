var express = require('express');
var router = express.Router();
const authController = require ('../controllers/authController');
var passport = require("passport");

router.get('/signup', function(req, res, next) {
  var auth = new authController();
  auth.signup(req,res)
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/signup'
}));
router.get('/signin', function(req, res, next) {
    var auth = new authController();
    auth.signin(req,res)
  });

 router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/signin'
}));  
module.exports = router;