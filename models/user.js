module.exports =function(sequelize, DataTypes){
    return sequelize.define('user', {
firstName:{
    type:DataTypes.STRING
},
lastName:{
    type:DataTypes.STRING
},
email:{
    type: DataTypes.STRING
},
pin:{
    type:DataTypes.INTEGER
},
stars:{
    type:DataTypes.INTEGER
},
password:{
    type:DataTypes.STRING
}

    });
  };
  