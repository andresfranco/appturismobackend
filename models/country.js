'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country= sequelize.define('Country', {
    name: {type:DataTypes.STRING, allowNull: false},
    phonecode: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Country;
};