module.exports =function(sequelize, DataTypes){
    return sequelize.define('user', {
firstName:{
    type:DataTypes.STRING,
    allowNull:false
},
lastName:{
    type:DataTypes.STRING,
    allowNull:false
},
email:{
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
        isEmail: {
        msg: "Email address must be valid."
        }
    }
},
pin:{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate: {
        len: {
            args:4,
            msg: "PIN must be at least 4 characters in length."
        }
}
},
stars:{
    type:DataTypes.INTEGER
},
password:{
    type:DataTypes.STRING,
    allowNull:false,
    validate: {
        len: {
            args:6,
            msg: "Password must be at least 6 characters in length."
        }
    }
}
})}