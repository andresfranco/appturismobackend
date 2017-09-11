var express = require('express');
var router = express.Router();
const authController = require ('../controllers/authController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var auth = new authController();
  auth.getAllUsers(req, res, next);
});

module.exports = router;

