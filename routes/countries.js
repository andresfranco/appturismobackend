var express = require('express');
var router = express.Router();
var countryController = require('../controllers/countryController');
var country = new countryController();
/* GET users listing. */
router.get('/', function(req, res, next) {
   country.getAll(req,res);
});

router.get('/show/:id', function(req, res, next) {
  country.show(req,res);
});

router.post('/new', function(req, res, next) {
  country.create(req,res);
});

router.patch('/update/:id', function(req, res, next) {
  country.update(req,res);
});

router.delete('/delete/:id', function(req, res, next) {
  country.delete(req,res);
});
module.exports = router;

