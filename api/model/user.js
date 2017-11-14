module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('tbluser', {
      userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.INTEGER,
        autoIncrement: true
      },
      UserName:{
          type:DataTypes.STRING,
          required: true
      },
      password:{
          type:DataTypes.STRING,
          required:true
      }
    })
  }
