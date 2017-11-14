var lodash = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
router = require('./api/routes/index');
var app = express();
var morgan = require('morgan');
// var student = require('./student')
var db = require("./api/config/db")
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
router(app, db);

app.get("/api/", function (req, res) {
  res.json({
    message: "Express is up!"
  });
});

db.sequelize.sync().then(() => {
  app.listen(3000, function () {
    console.log("Express running", this.address().port);
  });
})