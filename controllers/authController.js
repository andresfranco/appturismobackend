'use strict';
var models = require('../models/index');
var bcrypt = require('bcrypt');
var errorController =require('../controllers/errorController');
var passport = require("passport");
require('../config/passport/passport')(passport);
var jwt = require('jsonwebtoken');
var dbErrors =new errorController();
var User =models.user;
var configData ={secret:'picorodaimaku'}
class authController{
    getAllUsers (req,res,next){
        models.user.findAll({attributes: ['name','email']}).then(function(users){ 
            res.json(users);
        });
    } 
    signup (req,res) {  
        User.create(
            {name:req.body.name,
            email:req.body.email,
            password:this.hashPassword(req.body.password)
            })
        .then(user => {
            res.json(user);
        }).catch(function(err){
             res.json(dbErrors.getOrmError(err));
        });
    }
    
    signin (req,res) {
        User.findOne({where:{email:req.body.email}}).then(user => {  
            if (user){
             var validPassword =this.checkValidPassword(req.body.password,user.password);   
             if(validPassword){
               var token = jwt.sign(user,configData.secret);
               res.json({success: true, token: 'JWT ' + token});
             }else{
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
             } 
            }else{
                res.json({code:0,error:"Authentication failed: Email not found"});
            }
            
        }).catch(function(err){
            res.json(dbErrors.getOrmError(err));
        });
    }

    hashPassword(password){
        var saltRounds= 10;
        var hash = bcrypt.hashSync(password, saltRounds);
        return hash;
    }

    checkValidPassword(password,hashPassword){
         return bcrypt.compareSync(password,hashPassword);
    }


}
module.exports = authController;

