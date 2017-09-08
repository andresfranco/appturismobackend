var express = require('express');
var router = express.Router();
var countryController = require('../controllers/countryController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  countryController.getAll(req,res,next);
});

module.exports = router;

