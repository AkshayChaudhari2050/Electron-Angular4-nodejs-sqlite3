const Sequelize = require('sequelize');
const sequelize = new Sequelize("student", null, null, {
  dialect: "sqlite",
  storage: './student.db',
  define: {
    timestamps: false,
    freezeTableName: true,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Students = require('../model/student')(sequelize, Sequelize);
db.users = require('../model/user')(sequelize, Sequelize);
//  db.owner = require('../owner')(sequelize, Sequelize);
// db.users = require('../model/user')(sequelize, Sequelize);
module.exports = db;

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });
