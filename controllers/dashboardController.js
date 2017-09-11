var models = require('../models/index');
class dashboardController{
    index (req,res){
        res.render('dashboard');
        }
    } 
module.exports = dashboardController;