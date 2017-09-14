'use strict';
var models = require('../models/index');
var bcrypt = require('bcrypt');
var errorController =require('../controllers/errorController');
var jwt = require('jsonwebtoken');
var dbErrors =new errorController();
var User =models.user;
var config =require('../config/passport/config');
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
             var validPassword =this.checkValidPassword(req.body.password,user.dataValues.password);   
             if(validPassword){
               var token = jwt.sign(user.dataValues,config.secret);
               res.json({success: true, token: 'JWT ' + token});
             }else{
                res.json({success: false, msg: 'Authentication failed. Wrong password.'});
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

    getToken(req) {
        var token = null;
        if (req.headers){ token = req.headers.authorization;}
        return token;
      }



}
module.exports = authController;

