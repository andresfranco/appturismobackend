'use strict';
var models = require('../models/index');
 exports.getAllUsers = function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    models.user.findAll({attributes: ['name','email']}).then(function(users){ 
    users.length<1?res.json({code:1,message:"Countries not found"}): res.json(users);
    });
};
