var lodash = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
//var User = require('./orm')
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var Sequelize = require('sequelize');
var app = express();
// var bcrypt = require('bcrypt');

var sequelize = new Sequelize('null', 'null', 'null', {
  dialect: 'sqlite',
  storage: './student.db',
  define: {
    timestamps: false,
    freezeTableName: true,
  }
});
var Student = sequelize.define('tblstudentmaster', {
  studentid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grno: Sequelize.INTEGER,
  NAME: Sequelize.STRING,
  std: Sequelize.STRING,
  div: Sequelize.STRING,
  contactno: Sequelize.STRING,
  contactno2: Sequelize.STRING,
  ADDRESS: Sequelize.STRING,
  schoolid: Sequelize.INTEGER,

});

users = sequelize.define('tblusers', {
  NAME: Sequelize.STRING,
  PASSWORD: Sequelize.STRING,
  email: Sequelize.STRING,
});

var jwtOptions = {}
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:

  var users = sequelize.query("SELECT * FROM tblusers", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(function (users) {
      //console.log(users);
      var user = users[lodash.findIndex(users, {
        userid: jwt_payload.userid
      })];
      console.log("UserName: " + user.NAME);
      console.log("Password: " + user.PASSWORD);
      console.log("userid: " + user.userid);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
});
passport.use(strategy);
app.use(passport.initialize());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())
app.get("/", function (req, res) {
  res.json({
    message: "Express is up!"
  });
});
app.post('/users', function (req, res) {
  var Users = require('./users');
  Users.Users.create({
    NAME: req.body.NAME,
    PASSWORD: req.body.PASSWORD,
  }).then(function (users) {
    res.json(users);
  });
});

app.get('/find', function (req, res) {

  sequelize.query("SELECT * FROM tblusers", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(users => {
      res.json(users)
    });
});
app.post("/login", function (req, res) {
  if (req.body.NAME && req.body.PASSWORD) {
    var NAME = req.body.NAME;
    var PASSWORD = req.body.PASSWORD;
  }
  // usually this would be a database call:
  var users = sequelize.query("SELECT * FROM tblusers", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(function (users) {
      console.log(users);
      var user = users[lodash.findIndex(users, {
        NAME: NAME
      })];

      if (!user) {
        res.status(401).json({
          message: "no such user found"
        });
      } else {
        if (user.PASSWORD === req.body.PASSWORD) {
          // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
          var payload = {
            userid: user.userid
          };
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({
            message: "ok",
            token: token
          });
        } else {
          res.status(401).json({
            message: "PASSWORD did not match"
          });
        }
      }
    })
});

app.post('/api/user', function (req, res, next) {
  var PASSWORD = ''
  users.create({
    NAME: req.body.NAME,
    PASSWORD: req.body.PASSWORD,
    email: req.body.email,
  }).then(function (users) {
    res.json({
      success: true,
      msg: "success",
      data: users
    });
  })
});

// app.post('/api/student/:schoolid', passport.authenticate('jwt', {
//     session: false
// }), function (req, res, err) {

app.post('/api/student/:schoolid', function (req, res, err) {

  Student.create({
    grno: req.body.grno,
    NAME: req.body.NAME,
    std: req.body.std,
    div: req.body.div,
    contactno: req.body.contactno,
    contactno2: req.body.contactno2,
    ADDRESS: req.body.ADDRESS,
    schoolid: req.params.schoolid
  }).then(function (Student) {

    res.json({
      success: true,
      msg: "success"
    });
  });
  console.log("save Student");
});

app.get("/secret", passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  console.log(req.get('Authorization'));
  res.json({
    message: "Success! You can not see this without a token"
  });
});

app.get('/profile', passport.authenticate('jwt', {
    session: false
  }),
  function (req, res) {
    res.json({
      message: "Success! You can not see this without a token"
    });
  }
);

app.delete('/user/:studentid', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  const studentid = req.params.studentid;
  Student.destroy({
    where: {
      studentid: studentid
    }
  }).then(function () {
    res.json({
      success: true,
      msg: "delete success"
    });
  });
});

app.get('/user/delete', function (req, res) {
  users.destroy({
    where: {
      NAME: 'jigar'
    }
  }).then(function (req, res) {
    res.json({
      message: "Success! You can not see this without a token"
    });
  });
});

// app.put('/update/student/:studentid', function (req, res) {
//     const studentid = req.params.studentid;
//     const NAME = req.body.NAME;


//     Student.find({
//         where: {
//             studentid: studentid
//         }
//     }).then(Student => {
//         return Student.updateAttributes(NAME);
//     }).then(updatedStudent => {
//         res.json(updatedStudent);
//     });
// });
app.put('/update/student/:studentid', passport.authenticate('jwt', {
  session: false
}), function (req, res, next) {
  const studentid = req.params.studentid;
  Student.update({
    NAME: req.body.NAME,
    grno: req.body.grno,
    std: req.body.std,
    div: req.body.div,
    contactno: req.body.contactno,
    contactno2: req.body.contactno2,
    ADDRESS: req.body.ADDRESS,
    schoolid: req.body.schoolid
  }, {
    returning: true,
    where: {
      studentid: req.params.studentid
    }
  }).then(function () {
    res.json({
      success: true,
      msg: "Updated Success"
    })
  });
});

app.post('/api/report/monthlyAttendance/:schoolid', function (req, res, err) {
  schoolid = req.params.schoolid;
  const sql = require('mssql')
  new sql.Request()
    .input("StandardId", sql.Int, 1)
    .input("Divid", sql.Int, 2)
    .input("fromdate", sql.STRING, "05 2017")

});
app.listen(8282, function () {
  console.log("Express running", this.address().port);
});
