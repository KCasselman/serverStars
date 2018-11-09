let sequelize = require("./db")
let UserModel = sequelize.import('./models/user')
let GoalModel = sequelize.import('./models/goal')

UserModel.hasMany(GoalModel, {as:"goals"})
GoalModel.belongsTo(UserModel)

///DO NOT CHANGE!!!!!!!!!

sequelize.sync().then(console.log('tablesASSOCIATED'))
