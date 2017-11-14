module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('tblstudentmaster', {
    studentid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    grno: {
      type: DataTypes.INTEGER,
      required: true
    },
    studentName: {
      type: DataTypes.STRING,
      required: true
    },
    Std: {
      type: DataTypes.INTEGER,
      required: true
    },
    Div: {
      type: DataTypes.INTEGER,
      required: true
    }
  });
  return Student;
};
