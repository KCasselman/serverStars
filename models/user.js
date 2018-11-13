module.exports =function(sequelize, DataTypes){
    return sequelize.define('user', {
firstName:{
    type:DataTypes.STRING,
},
lastName:{
    type:DataTypes.STRING,
},
email:{
    type: DataTypes.STRING,
    validate: {
        isEmail: {
        msg: "Email address must be valid."
        }
    }
},
pin:{
    type:DataTypes.INTEGER,
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
    validate: {
        len: {
            args:6,
            msg: "Password must be at least 6 characters in length."
        }
    }
}
})}