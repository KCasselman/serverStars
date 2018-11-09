let sequelize = require("./db")
let UserModel = sequelize.import('./models/user')
let GoalModel = sequelize.import('./models/goal')

UserModel.hasMany(GoalModel, {as:"goals"})
GoalModel.belongsTo(UserModel)


sequelize.sync().then(console.log('hey'))
// sequelize.sync({force:true})
