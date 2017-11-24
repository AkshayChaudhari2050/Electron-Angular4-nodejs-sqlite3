module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('tbluser', {
      userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    });
    return user
  };
