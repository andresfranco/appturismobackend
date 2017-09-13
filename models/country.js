'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country= sequelize.define('country', {
  name: {
    type:DataTypes.STRING, 
    allowNull: false, 
    validate: { notEmpty:{msg:"Name can not be empty"} }
  },
  phonecode: {
    type:DataTypes.INTEGER,
    allowNull: false, 
    validate: { 
      notEmpty: {msg:"Phone Code can not be empty"} ,
      isInt:{msg:"Phone Code has to be Integer"}
    }
  }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Country;
};