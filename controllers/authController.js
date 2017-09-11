'use strict';
var models = require('../models/index');
class authController{
getAllUsers (req,res,next){
        models.user.findAll({attributes: ['name','email']}).then(function(users){ 
            res.json(users);
        });
    }    
}
module.exports = authController;

