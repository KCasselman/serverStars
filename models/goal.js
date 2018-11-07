module.exports =function(sequelize, DataTypes){
    return sequelize.define('goal', {
goal:{
    type: DataTypes.STRING
},
message:{
    type:DataTypes.STRING
},
starred:{
    type:DataTypes.BOOLEAN
}

    });
  };
  