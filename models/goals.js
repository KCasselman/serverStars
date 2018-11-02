'use strict';
module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define('goals', {
    goal: DataTypes.STRING,
    message: DataTypes.STRING,
    dueDate: DataTypes.DATE,
  }, {});
  goals.associate = function(models) {
    // associations can be defined here
  };
  return goals;
};