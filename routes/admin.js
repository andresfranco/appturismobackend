var express = require('express');
var router = express.Router();
const dashboardController = require ('../controllers/dashboardController');
const authController = require ('../controllers/authController');
var errorController =require('../controllers/errorController');
var passport = require("passport");
var auth =new authController();
var dashboard =new dashboardController();
var dbErrors =new errorController();
require('../config/passport/passport')(passport);
var jwt = require('jsonwebtoken');

router.get('/dashboard', passport.authenticate('jwt', { session: false,failWithError: true}), function(req,res) {
  if(req.user){
    //Redirect to Dashboard
    dashboard.index(req,res);
  }else
  {
    return res.json({status:403,success: false, msg: 'User is not Authorized'});
  }
 
},
// handle error When is not authenticated
function(err, req, res, next) {
  if (!req.xhr) { return res.json(dbErrors.getPassportError(err)); }
}

);
module.exports = router;