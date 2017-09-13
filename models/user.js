'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User= sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      comparePassword : function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
      }
    },
    hooks: {
      afterCreate: () => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return (err);
                }
                bcrypt.hash( User.password, salt, null, function (err, hash) {
                    if (err) {
                        return (err);
                    }
                    User.password = hash;
                });
            });   
      }
    }
  });
  return User;
};