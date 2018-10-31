'use strict';
module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define('goals', {
    goal: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    pin: DataTypes.STRING
  }, {});
  goals.associate = function(models) {
    // associations can be defined here
  };
  return goals;
};