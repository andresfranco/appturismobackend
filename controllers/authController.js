'use strict';
var models = require('../models/index');
class authController{
    getAllUsers (req,res,next){
        models.user.findAll({attributes: ['name','email']}).then(function(users){ 
            res.json(users);
        });
    } 
    signup (req,res) {
        res.render('signup');
    }
    
    signin (req,res) {
        res.render('signin');
    }  
}
module.exports = authController;

