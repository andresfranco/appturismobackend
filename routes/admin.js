var express = require('express');
var router = express.Router();
const dashboardController = require ('../controllers/dashboardController');

router.get('/dashboard', function(req, res, next) {
  var dashboard = new dashboardController();
 dashboard.index(req,res)
});
module.exports = router;