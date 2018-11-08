let sequelize = require("./db")
let UserModel = sequelize.import('./models/user')
let GoalModel = sequelize.import('./models/goal')
// let BillyModel=sequelize.import('./models/billy.js')
// let FrankModel=sequelize.import('./models/frank.js')

UserModel.hasMany(GoalModel, {as:"goals"})
GoalModel.belongsTo(UserModel)

// BillyModel.hasOne(FrankModel)
// FrankModel.belongsTo(BillyModel)



sequelize.sync().then(console.log('fook this'))
// sequelize.sync({force:true})
