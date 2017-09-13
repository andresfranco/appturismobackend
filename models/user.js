'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User= sequelize.define('user', {
    name: DataTypes.STRING,
    email: {type:DataTypes.STRING, unique: true, 
      validate: {
        isEmail:{
          msg:"Invalid email"
        },
        isUnique: function (value, next) {
          var self = this;
          User.find({where: {email: value}})
              .then(function (user) {
                  if (user && self.id !== user.id) {
                      return next('Email already in use!');
                  }
                  return next();
              })
              .catch(function (err) {
                  return next(err);
              });
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len: {args:[5,255],msg:"Password invalid"}
      }
    }
    }
    ,{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      
    }
   
  });
  return User;
};