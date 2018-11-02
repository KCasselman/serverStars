module.exports = function (sequelize, DataTypes) {
    const UserGoals = sequelize.define('userGoals', {
    complete:{type: DataTypes.BOOLEAN},
    // goalId:{type:dataTypes.INTEGER}
  })
  return UserGoals
}